import tornado.ioloop
import tornado.web
import tornado.websocket
import tornado.gen
import psutil, json
import datetime
from models.process import Process

class EchoWebSocket(tornado.websocket.WebSocketHandler):
    def testing_callback(self):
        self.write_message({'dataType': 'sysInfo',
                            'data': 'testing'})
    def get_color(self, percentage):
        if percentage < 25:
            return '#55FF09'
        if percentage < 75:
            return '#E8A000'
        else:
            return '#FF0000'
    def cpu_percent(self):
        if not self.stream.closed():
            cpu_stats = [{'cpuid':i[0], 'usage':  i[1], 'color': self.get_color(i[1])} for i in enumerate(psutil.cpu_percent(percpu=True))]
            proc_stat = [Process(psutil.Process(pid)).__dict__ for pid in psutil.pids()[:25]]
            mem_data = psutil.virtual_memory()._asdict()
            mem_data['category'] = datetime.datetime.now().isoformat()
            self.write_message(json.dumps({'dataType': 'cpuInfo',
                                            'data': cpu_stats}))
            self.write_message(json.dumps({'dataType': 'memInfo',
                                            'data': mem_data}))
            self.write_message(json.dumps({'dataType': 'cpuAvg',
                                            'data': psutil.cpu_percent()}))
            self.write_message(json.dumps({'dataType': 'proc',
                                            'data': proc_stat}))
    def check_origin(self, origin):
        return True

    def open(self):
        self.pCallback = tornado.ioloop.PeriodicCallback(self.cpu_percent,callback_time=1000)
        self.pCallback.start()
        # tornado.ioloop.IOLoop.add_callback(self.testing_callback)
        print("WebSocket opened")

    def on_message(self, message):
        self.write_message(json.dumps({'cpuCores':
                            [{'cpuid':i[0], 'usage':  i[1]} for i in enumerate(psutil.cpu_percent(percpu=True))]}))

    def on_close(self):
        print("WebSocket closed")


if __name__ == "__main__":
    application = tornado.web.Application([
        (r"/", EchoWebSocket),
    ])
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
