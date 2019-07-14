# English dictionary

It is an English dictionary where you can find description for your beloved word. :)

## API endpoints
- `GET /api/search/@name` - search by full name
- `GET /api/search/like/@name` - search like keyword

## Devbox with Docker container

### Build the image:

- navigate to root folder `cd english-dictionary`

- `docker build -t english-dictionary:latest -f docker/Dockerfile .`

### Run the container from image

- `docker run -p 8080:80 -d -v $(pwd):/var/www/english-dictionary english-dictionary`