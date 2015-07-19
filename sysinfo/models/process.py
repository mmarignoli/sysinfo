class Process:

    def __init__(self, p):
        self.name = p.name()
        self.exe = p.exe()
        self.cwd = p.cwd()
        self.cmdline = " ".join(p.cmdline())
        self.status = p.status()
        self.username = p.username()
        self.cpu_percent = p.cpu_percent()
        self.id = p.pid
