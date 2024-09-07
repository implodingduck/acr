FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY ./manage.py /code/manage.py
COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY ./run.sh /code/run.sh
COPY ./backend /code/backend
COPY ./gameserver /code/gameserver

EXPOSE 8000

RUN python manage.py collectstatic --noinput

#CMD ["gunicorn", "--bind", ":8000", "--workers", "2", "backend.wsgi:application"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]