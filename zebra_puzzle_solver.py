#!/usr/bin/env python3
"""
Zebra Puzzle Solver with Tkinter GUI
=====================================

This program solves the classic Zebra Puzzle (also known as Einstein's Riddle)
using constraint satisfaction with backtracking. The puzzle involves determining
the attributes of 5 houses based on 15 logical constraints.

The Zebra Puzzle:
- There are 5 houses in a row, each with different attributes
- Each house has: color, nationality of owner, pet, drink, and cigarette brand
- Given 15 clues, determine who owns the zebra and who drinks water

Author: Zebra Puzzle Solver
Dependencies: Only Python standard library (Tkinter)
"""

import tkinter as tk
from tkinter import ttk, messagebox
from itertools import permutations
import threading


class ZebraPuzzleSolver:
    """
    Constraint satisfaction solver for the Zebra Puzzle using backtracking.
    """
    
    def __init__(self):
        # Define all possible values for each attribute
        self.colors = ['Red', 'Green', 'Blue', 'Yellow', 'White']
        self.nationalities = ['British', 'Swedish', 'Danish', 'Norwegian', 'German']
        self.pets = ['Dog', 'Bird', 'Cat', 'Horse', 'Zebra']
        self.drinks = ['Tea', 'Coffee', 'Milk', 'Beer', 'Water']
        self.cigarettes = ['Pall Mall', 'Dunhill', 'Blends', 'Blue Master', 'Prince']
        
        # Solution will be stored as list of 5 houses, each house is a dict
        self.solution = None
    
    def solve(self):
        """
        Main solving method using constraint satisfaction with backtracking.
        Returns True if solution found, False otherwise.
        """
        # Generate all possible permutations for each attribute
        for colors in permutations(self.colors):
            for nationalities in permutations(self.nationalities):
                for pets in permutations(self.pets):
                    for drinks in permutations(self.drinks):
                        for cigarettes in permutations(self.cigarettes):
                            # Create current configuration
                            houses = []
                            for i in range(5):
                                houses.append({
                                    'position': i + 1,
                                    'color': colors[i],
                                    'nationality': nationalities[i],
                                    'pet': pets[i],
                                    'drink': drinks[i],
                                    'cigarette': cigarettes[i]
                                })
                            
                            # Check if this configuration satisfies all constraints
                            if self.check_constraints(houses):
                                self.solution = houses
                                return True
        
        return False
    
    def check_constraints(self, houses):
        """
        Check if the current house configuration satisfies all 15 constraints.
        """
        try:
            # Constraint 1: The British person lives in the red house
            if not any(h['nationality'] == 'British' and h['color'] == 'Red' for h in houses):
                return False
            
            # Constraint 2: The Swedish person keeps dogs as pets
            if not any(h['nationality'] == 'Swedish' and h['pet'] == 'Dog' for h in houses):
                return False
            
            # Constraint 3: The Danish person drinks tea
            if not any(h['nationality'] == 'Danish' and h['drink'] == 'Tea' for h in houses):
                return False
            
            # Constraint 4: The green house is on the left of the white house
            green_pos = next(h['position'] for h in houses if h['color'] == 'Green')
            white_pos = next(h['position'] for h in houses if h['color'] == 'White')
            if green_pos != white_pos - 1:
                return False
            
            # Constraint 5: The green house's owner drinks coffee
            if not any(h['color'] == 'Green' and h['drink'] == 'Coffee' for h in houses):
                return False
            
            # Constraint 6: The person who smokes Pall Mall rears birds
            if not any(h['cigarette'] == 'Pall Mall' and h['pet'] == 'Bird' for h in houses):
                return False
            
            # Constraint 7: The owner of the yellow house smokes Dunhill
            if not any(h['color'] == 'Yellow' and h['cigarette'] == 'Dunhill' for h in houses):
                return False
            
            # Constraint 8: The person living in the center house drinks milk
            center_house = next(h for h in houses if h['position'] == 3)
            if center_house['drink'] != 'Milk':
                return False
            
            # Constraint 9: The Norwegian lives in the first house on the left
            first_house = next(h for h in houses if h['position'] == 1)
            if first_house['nationality'] != 'Norwegian':
                return False
            
            # Constraint 10: The person who smokes Blends lives next to the one who keeps cats
            blends_pos = next(h['position'] for h in houses if h['cigarette'] == 'Blends')
            cat_pos = next(h['position'] for h in houses if h['pet'] == 'Cat')
            if abs(blends_pos - cat_pos) != 1:
                return False
            
            # Constraint 11: The person who keeps horses lives next to the person who smokes Dunhill
            horse_pos = next(h['position'] for h in houses if h['pet'] == 'Horse')
            dunhill_pos = next(h['position'] for h in houses if h['cigarette'] == 'Dunhill')
            if abs(horse_pos - dunhill_pos) != 1:
                return False
            
            # Constraint 12: The person who smokes Blue Master drinks beer
            if not any(h['cigarette'] == 'Blue Master' and h['drink'] == 'Beer' for h in houses):
                return False
            
            # Constraint 13: The German smokes Prince
            if not any(h['nationality'] == 'German' and h['cigarette'] == 'Prince' for h in houses):
                return False
            
            # Constraint 14: The Norwegian lives next to the blue house
            norwegian_pos = next(h['position'] for h in houses if h['nationality'] == 'Norwegian')
            blue_pos = next(h['position'] for h in houses if h['color'] == 'Blue')
            if abs(norwegian_pos - blue_pos) != 1:
                return False
            
            # Constraint 15: The person who smokes Blends has a neighbor who drinks water
            blends_pos = next(h['position'] for h in houses if h['cigarette'] == 'Blends')
            water_positions = [h['position'] for h in houses if h['drink'] == 'Water']
            if not any(abs(blends_pos - pos) == 1 for pos in water_positions):
                return False
            
            # All constraints satisfied!
            return True
            
        except (StopIteration, ValueError):
            # If any constraint check fails due to missing values
            return False


class ZebraPuzzleGUI:
    """
    Beautiful Tkinter GUI for the Zebra Puzzle Solver.
    """
    
    def __init__(self):
        self.solver = ZebraPuzzleSolver()
        self.setup_gui()
    
    def setup_gui(self):
        """
        Create and configure the main GUI window with modern styling.
        """
        # Main window setup
        self.root = tk.Tk()
        self.root.title("🦓 Zebra Puzzle Solver")
        self.root.geometry("900x700")
        self.root.configure(bg='#f0f0f0')
        
        # Configure style for modern look
        style = ttk.Style()
        style.theme_use('clam')
        
        # Custom colors
        self.colors = {
            'primary': '#2c3e50',
            'secondary': '#3498db',
            'success': '#27ae60',
            'warning': '#f39c12',
            'danger': '#e74c3c',
            'light': '#ecf0f1',
            'dark': '#34495e'
        }
        
        self.create_header()
        self.create_puzzle_grid()
        self.create_controls()
        self.create_status_bar()
    
    def create_header(self):
        """
        Create the header section with title and description.
        """
        header_frame = tk.Frame(self.root, bg=self.colors['primary'], height=100)
        header_frame.pack(fill='x', padx=0, pady=0)
        header_frame.pack_propagate(False)
        
        # Title
        title_label = tk.Label(
            header_frame,
            text="🦓 Zebra Puzzle Solver",
            font=('Helvetica', 24, 'bold'),
            fg='white',
            bg=self.colors['primary']
        )
        title_label.pack(pady=(20, 5))
        
        # Subtitle
        subtitle_label = tk.Label(
            header_frame,
            text="Solve Einstein's famous logic puzzle using constraint satisfaction",
            font=('Helvetica', 12),
            fg='#bdc3c7',
            bg=self.colors['primary']
        )
        subtitle_label.pack()
    
    def create_puzzle_grid(self):
        """
        Create the 5x6 grid to display houses and their attributes.
        """
        # Main grid frame
        grid_frame = tk.Frame(self.root, bg='#f0f0f0')
        grid_frame.pack(fill='both', expand=True, padx=20, pady=20)
        
        # Grid title
        grid_title = tk.Label(
            grid_frame,
            text="House Attributes",
            font=('Helvetica', 16, 'bold'),
            fg=self.colors['dark'],
            bg='#f0f0f0'
        )
        grid_title.pack(pady=(0, 15))
        
        # Create the grid container
        self.grid_container = tk.Frame(grid_frame, bg='white', relief='solid', bd=1)
        self.grid_container.pack(fill='both', expand=True)
        
        # Headers
        headers = ['House 1', 'House 2', 'House 3', 'House 4', 'House 5']
        attributes = ['Color', 'Nationality', 'Pet', 'Drink', 'Cigarette']
        
        # Create grid of labels
        self.grid_labels = {}
        
        # Header row
        for col, header in enumerate(headers):
            label = tk.Label(
                self.grid_container,
                text=header,
                font=('Helvetica', 12, 'bold'),
                bg=self.colors['secondary'],
                fg='white',
                relief='solid',
                bd=1,
                pady=10
            )
            label.grid(row=0, column=col+1, sticky='nsew', padx=1, pady=1)
        
        # Attribute labels and grid cells
        for row, attr in enumerate(attributes, 1):
            # Attribute label
            attr_label = tk.Label(
                self.grid_container,
                text=attr,
                font=('Helvetica', 11, 'bold'),
                bg=self.colors['dark'],
                fg='white',
                relief='solid',
                bd=1,
                padx=10,
                pady=8
            )
            attr_label.grid(row=row, column=0, sticky='nsew', padx=1, pady=1)
            
            # Data cells
            for col in range(5):
                cell_label = tk.Label(
                    self.grid_container,
                    text='?',
                    font=('Helvetica', 10),
                    bg='white',
                    fg=self.colors['dark'],
                    relief='solid',
                    bd=1,
                    padx=8,
                    pady=8
                )
                cell_label.grid(row=row, column=col+1, sticky='nsew', padx=1, pady=1)
                self.grid_labels[(row, col)] = cell_label
        
        # Configure grid weights for responsive design
        for i in range(6):
            self.grid_container.columnconfigure(i, weight=1)
        for i in range(6):
            self.grid_container.rowconfigure(i, weight=1)
    
    def create_controls(self):
        """
        Create control buttons and information panel.
        """
        controls_frame = tk.Frame(self.root, bg='#f0f0f0')
        controls_frame.pack(fill='x', padx=20, pady=10)
        
        # Solve button
        self.solve_button = tk.Button(
            controls_frame,
            text="🔍 Solve Puzzle",
            font=('Helvetica', 14, 'bold'),
            bg=self.colors['success'],
            fg='white',
            relief='flat',
            padx=30,
            pady=12,
            cursor='hand2',
            command=self.solve_puzzle_threaded
        )
        self.solve_button.pack(side='left', padx=(0, 10))
        
        # Clear button
        self.clear_button = tk.Button(
            controls_frame,
            text="🗑️ Clear",
            font=('Helvetica', 12),
            bg=self.colors['warning'],
            fg='white',
            relief='flat',
            padx=20,
            pady=12,
            cursor='hand2',
            command=self.clear_grid
        )
        self.clear_button.pack(side='left', padx=(0, 10))
        
        # Info button
        info_button = tk.Button(
            controls_frame,
            text="ℹ️ About",
            font=('Helvetica', 12),
            bg=self.colors['secondary'],
            fg='white',
            relief='flat',
            padx=20,
            pady=12,
            cursor='hand2',
            command=self.show_info
        )
        info_button.pack(side='right')
    
    def create_status_bar(self):
        """
        Create status bar for displaying solving progress and results.
        """
        self.status_frame = tk.Frame(self.root, bg=self.colors['light'], height=40)
        self.status_frame.pack(fill='x', side='bottom')
        self.status_frame.pack_propagate(False)
        
        self.status_label = tk.Label(
            self.status_frame,
            text="Ready to solve the puzzle! Click 'Solve Puzzle' to begin.",
            font=('Helvetica', 10),
            fg=self.colors['dark'],
            bg=self.colors['light'],
            anchor='w'
        )
        self.status_label.pack(fill='x', padx=10, pady=10)
    
    def solve_puzzle_threaded(self):
        """
        Run the puzzle solver in a separate thread to keep GUI responsive.
        """
        def solve_worker():
            self.solve_button.config(state='disabled', text="🔄 Solving...")
            self.status_label.config(text="Solving puzzle... This may take a moment.")
            self.root.update()
            
            try:
                success = self.solver.solve()
                
                if success:
                    self.root.after(0, self.display_solution)
                else:
                    self.root.after(0, lambda: self.status_label.config(text="No solution found!"))
            except Exception as e:
                self.root.after(0, lambda: self.status_label.config(text=f"Error: {str(e)}"))
            finally:
                self.root.after(0, lambda: self.solve_button.config(state='normal', text="🔍 Solve Puzzle"))
        
        # Start solving in background thread
        thread = threading.Thread(target=solve_worker, daemon=True)
        thread.start()
    
    def display_solution(self):
        """
        Display the solved puzzle in the grid with colored highlights.
        """
        if not self.solver.solution:
            return
        
        # Define colors for different house colors
        house_colors = {
            'Red': '#ffebee',
            'Green': '#e8f5e8',
            'Blue': '#e3f2fd',
            'Yellow': '#fff9c4',
            'White': '#fafafa'
        }
        
        attributes = ['color', 'nationality', 'pet', 'drink', 'cigarette']
        
        # Fill the grid with solution data
        for col, house in enumerate(self.solver.solution):
            bg_color = house_colors.get(house['color'], 'white')
            
            for row, attr in enumerate(attributes):
                label = self.grid_labels[(row, col)]
                label.config(
                    text=house[attr],
                    bg=bg_color,
                    font=('Helvetica', 10, 'bold'),
                    fg=self.colors['dark']
                )
        
        # Find and highlight special answers
        zebra_owner = next(h['nationality'] for h in self.solver.solution if h['pet'] == 'Zebra')
        water_drinker = next(h['nationality'] for h in self.solver.solution if h['drink'] == 'Water')
        
        self.status_label.config(
            text=f"✅ Solved! The {zebra_owner} owns the zebra, and the {water_drinker} drinks water.",
            fg=self.colors['success']
        )
        
        # Show success message
        messagebox.showinfo(
            "Puzzle Solved!",
            f"🎉 Congratulations!\n\n"
            f"The {zebra_owner} owns the zebra 🦓\n"
            f"The {water_drinker} drinks water 💧\n\n"
            f"The complete solution is displayed in the grid above."
        )
    
    def clear_grid(self):
        """
        Clear the grid and reset to initial state.
        """
        for label in self.grid_labels.values():
            label.config(text='?', bg='white', font=('Helvetica', 10), fg=self.colors['dark'])
        
        self.solver.solution = None
        self.status_label.config(
            text="Grid cleared. Ready to solve the puzzle!",
            fg=self.colors['dark']
        )
    
    def show_info(self):
        """
        Display information about the Zebra Puzzle.
        """
        info_text = """
🦓 The Zebra Puzzle (Einstein's Riddle)

This classic logic puzzle involves 5 houses with different attributes:
• House colors: Red, Green, Blue, Yellow, White
• Nationalities: British, Swedish, Danish, Norwegian, German  
• Pets: Dog, Bird, Cat, Horse, Zebra
• Drinks: Tea, Coffee, Milk, Beer, Water
• Cigarettes: Pall Mall, Dunhill, Blends, Blue Master, Prince

Given 15 logical constraints, determine:
❓ Who owns the zebra?
❓ Who drinks water?

The puzzle uses constraint satisfaction with backtracking to find the unique solution by testing all possible combinations until one satisfies all constraints.

Click 'Solve Puzzle' to see the algorithm in action!
        """
        
        messagebox.showinfo("About the Zebra Puzzle", info_text)
    
    def run(self):
        """
        Start the GUI application.
        """
        self.root.mainloop()


def main():
    """
    Main function to run the Zebra Puzzle Solver application.
    """
    print("🦓 Starting Zebra Puzzle Solver...")
    print("Initializing GUI...")
    
    try:
        app = ZebraPuzzleGUI()
        app.run()
    except Exception as e:
        print(f"Error running application: {e}")
        messagebox.showerror("Error", f"Failed to start application: {e}")


if __name__ == "__main__":
    main()