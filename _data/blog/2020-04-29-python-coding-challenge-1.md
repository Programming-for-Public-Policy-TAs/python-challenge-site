---
template: BlogPost
path: /coding-challenge-2
date: 2020-05-07T04:59:00.000Z
title: 'Python Coding Challenge #2'
thumbnail: /assets/neighborhood-urban-building-roof.jpg
---
# Schelling Agent-based Model

Thomas Schelling (1971) created an agent based model using checker boards to simulate the creation of segregated neighborhoods, in a society where no individual necessarily has a strong preference for segregation. To see a simulation with a visual component, visit the bottom of this page: <http://nifty.stanford.edu/2014/mccown-schelling-model-segregation/>

### Your Task:

Use Python to replicate Schelling's model. You won't be replicating the graphical component of the model, but you'll implement all of the logic. 

The program consists of two classes: World and Agent. In this challenge problem, the World class will be provided for you and it will be your job to implement the Agent class. Keep reading for an in-depth description of the model. 

**How to submit:** clone the repository below to your computer and complete the problems. To submit your solutions, click the "Submit Solutions" button on the home page and fill out the form with your name and a link to the repository with your solutions. Make sure the repository is set to "public" so we can see it. Submit before the deadline for credit on our Python Superstars leaderboard!

**Challenge Repo:** <https://github.com/Sawyer-Middeleer/Harris-Challenge-2>

### Before you Begin ⚠️

##### *This one is a bit complicated so take your time to read through this first.*

The code may look daunting, especially in the later steps, but you should have all of the tools necessary to read and understand this code. Very few new concepts are introduced, and the ones that are are simple.

The model has three basic rules that govern how agents interact in the world.

1. There are at least two kinds of agents (red and blue in our case)
2. Each agent needs a preference for similar neighbors
3. Each agent gets to move around if preference not met

Let's get into the code. The program starts with parameters for the World and Agent classes, which specifies the size of the world (a 20x20 grid), the number of agents in the world, the agents' preference for same-type neighbors (red or blue) and a maximum number of iterations in the model. 

```python
params = {'world_size':(20,20),
          'num_agents':380,
          'same_pref_r': 0.4, #red agent's pref for same color neighbours
          'same_pref_b': 0.3, #blue agent's pref for same color neighbours
          'proportion_r': 0.6,
          'max_iter'  :100,
          'print_to_screen': True}  #toggle this T/F to print output
```

Next, let's take a look at the World class. It starts with an init method that checks the parameters are okay and then calls other class methods to build the world. 

```python
class World():
    def __init__(self, params):
        assert(params['world_size'][0] * params['world_size'][1] > params['num_agents']), 'Grid too small for number of agents.'
        self.params = params
        self.reports = {}

        self.grid     = self.build_grid(params['world_size'])
        self.agents   = self.build_agents(params['num_agents'], params['same_pref_r'], params['same_pref_b'])

        self.init_world()
```

The following three methods are pretty self explanatory. build_grid() creates the model's grid and build_agents() generates a list of agents that will interact in the world. init_world() generates the starting conditions for the model. 

```python
def build_grid(self, world_size):
        #create the world that the agents can move around on
        locations = [(i,j) for i in range(world_size[0]) for j in range(world_size[1])]
        return {l:None for l in locations}

    def build_agents(self, num_agents, same_pref_r, same_pref_b):
        #generate a list of Agents (with kind and same_preference) that can be iterated over

        def _kind_picker(i):
            if i < round(num_agents * params['proportion_r']):
                return 'red'
            else:
                return 'blue'

        def _pref_picker(i):
            if i < round(num_agents * params['proportion_r']):
                return params['same_pref_r']
            else:
                return params['same_pref_b']
        
        agents = [Agent(self, _kind_picker(i), _pref_picker(i)) for i in range(num_agents)]
        random.shuffle(agents)
        return agents
    

    def init_world(self):
        #a method for all the steps necessary to create the starting point of the model

        for agent in self.agents:
            loc = self.find_vacant()
            self.grid[loc] = agent
            agent.location = loc

        assert(all([agent.location is not None for agent in self.agents])), "Some agents don't have homes!"
        assert(sum([occupant is not None for occupant in self.grid.values()]) == self.params['num_agents']), 'Mismatch between number of agents and number of locations with agents.'

        #set up some reporting dictionaries
        self.reports['integration'] = []
        self.reports['red_integration'] =[]
        self.reports['blue_integration'] = []
```

The next two methods, find_vacant and locate_neighbors, define the rules that determine how agents interact with one another and move around the world. report_integration() looks at the grid and calculates the degree of red-blue integration. Take some time to understand well how these work.

```python
   def find_vacant(self, return_all=False):
        #finds all empty patches on the grid and returns a random one, unless kwarg return_all==True,
        #then it returns a list of all empty patches

        empties = [loc for loc, occupant in self.grid.items() if occupant is None]
        if return_all:
            return empties
        else:
            choice_index = random.choice(range(len(empties)))
            return empties[choice_index]

    def locate_neighbors(self, loc):
        #given a location, return a list of all the patches that count as neighbors
        include_corners = True

        x, y = loc
        cardinal_four = [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]
        if include_corners:
            corner_four = [(x+1, y+1), (x+1, y-1), (x-1, y+1), (x-1, y-1)]
            neighbors = cardinal_four + corner_four
        else:
            neighbors = cardinal_four

        #handle patches that are at the edges, assuming a "torus" shape
        x_max = self.params['world_size'][0] - 1
        y_max = self.params['world_size'][1] - 1

        def _edge_fixer(loc):
            x, y = loc
            if x < 0:
                x = x_max
            elif x > x_max:
                x = 0

            if y < 0:
                y = y_max
            elif y > y_max:
                y = 0

            return (x, y)

        neighbors = [_edge_fixer(loc) for loc in neighbors]
        return neighbors
      
      def report_integration(self):
        diff_neighbors = []
        diff_neighbours_r = []
        diff_neighbours_b = []
        for agent in self.agents:
            diff_neighbors.append(sum(
                    [not a for a in agent.am_i_happy(neighbor_check=True)]
                                ))
        for agent in self.agents:
            if agent.kind == 'red':
                diff_neighbours_r.append(sum(
                    [not a for a in agent.am_i_happy(neighbor_check=True)]
                                ))
        for agent in self.agents:
            if agent.kind == 'blue':
                diff_neighbours_b.append(sum(
                    [not a for a in agent.am_i_happy(neighbor_check=True)]
                                ))
                

        self.reports['integration'].append(round(mean(diff_neighbors), 2))
        self.reports['red_integration'].append(round(mean(diff_neighbours_r), 2))
        self.reports['blue_integration'].append(round(mean(diff_neighbours_b), 2))
```

The final methods in the World class handle iterating through the model and reporting the model's output to the screen. I'm not going to copy them here, but make sure you understand these as well. 

**Finally, here's the part you'll be working on**. The Agent class is partially written and the methods that you will need to write are outlined. Your challenge is to fill in the "move" and "am_i_happy" methods according to the comments so that the model produces logical output expected by World's reporting methods. Good luck! 

```python
class Agent():
    #An agent needs to know if it is happy, needs to be able to move (find a vacancy and fill
    # it), can either check if it'll be happy in the new location, or not and
    # needs to report to World what it did
        def __init__(self, world, kind, same_pref):
        self.world = world
        self.kind = kind
        self.same_pref = same_pref
        self.location = None
    
    def move(self): 
        #moves an agent
        #agent has to know if it is happy to decide if it'll move 
        #agent has to be able to find vacancies (use self.world.find_vacant(...))
        #return something that indicates if the agent moved

        #the way it is currently writen:
        #return 4 #red moved
        #return 5 #blue moved
        #return 2 # red unhappy but did not move
        #return 3  # blue unhappy but did not move
        #return 0 # red happy, did not move
        #return 1 # blue happy, did not move

        pass

    def am_i_happy(self, loc=False, neighbor_check=False):
        #this should return a boolean for whether or not an agent is happy at a location
        #if loc is False, use current location, else use specified location
        #for reporting purposes, allow checking of the current number of similar neighbors

        #if an agent is in a patch with no neighbors at all, treat it as unhappy
        #if len(neighbor_kinds) == 0:
        #    return False
        pass
    
    def start_happy_r_b(self):
    #for reporting purposes, allow count of happy before any moves, of red and blue seperately
        if self.am_i_happy and self.kind == 'red':
            return 'a'
        elif self.am_i_happy and self.kind == 'blue':
            return 'b'
        else:
            pass
```
