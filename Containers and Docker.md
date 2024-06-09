# Exercise 09

#### <span style="color:rgb(0, 112, 192)">Docker create network</span>
<span style="color:rgb(0, 112, 192)"></span>
```yaml
docker network create react-express
```

#### <span style="color:rgb(0, 112, 192)">1.</span> <span style="color:rgb(0, 112, 192)">Build the Docker Image</span> 

Build the backend and frontend images

```yaml
docker build -t backend .
docker build -t frontend .
```

#### <span style="color:rgb(0, 112, 192)">2.</span> <span style="color:rgb(0, 112, 192)">Pull mongodb image</span> 

```yaml
docker pull mongodb
```