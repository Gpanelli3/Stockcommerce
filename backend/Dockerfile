#para hacerlo andar:
#docker build -t flaskapp .

# Usa una imagen base que ya incluya Python
FROM python:3.9-slim

# Actualiza pip
RUN pip install --upgrade pip

# Crea un directorio para la aplicación y establece el directorio de trabajo
WORKDIR /app

# Copia el archivo de requisitos primero para aprovechar la caché de Docker
COPY requirements.txt /app/

# Instala las dependencias de Python
RUN pip install -r requirements.txt

# Copia el resto de la aplicación
COPY . /app/

# Establece el comando predeterminado para ejecutar la aplicación
CMD ["flask", "--app", "app", "run", "--debug", "--reload", "--host", "0.0.0.0"]
