class Cell:
    def __init__(self, initial_state=0):
        self._state = initial_state

    def __repr__(self):
        return " # " if self.is_alive else "   "

    def set_alive(self):
        self._state = 1

    def set_dead(self):
        self._state = 0

    @property
    def is_alive(self):
        return self._state == 1