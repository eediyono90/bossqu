FROM python:3.11-slim

WORKDIR /app

COPY pyproject.toml poetry.lock ./
RUN pip install poetry && poetry config virtualenvs.create false && poetry install --no-root --no-interaction --no-ansi

COPY . .

WORKDIR /app/src

CMD ["python", "-u", "-m", "main"]