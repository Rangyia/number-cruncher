release: python ./backend/manage.py migrate
web: gunicorn --pythonpath backend config.wsgi
