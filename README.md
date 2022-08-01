# perceptual-map
A full stack application for making perceptual maps (e.g., customer perceptions of fast food restaurant qualities).
Each of perceptual map consists of dimensions (e.g., quality, taste), and subjects (e.g., McDonalds, Hesburger).

This repo consists of:
- Relational database (PSQL)
- Restful express server for handling api calls
- React client interface that enables interacting with the server

This repo has following features:
- JWT-authentication using Auth Bearer header and local storage
- CRUD operations for creating perceptual maps
- Answer feature that enables sharing the survey and get data
- Histogram, perceptual map, and multidimensional radar for visualizing the data

Work under progress:
- Integration tests for backend and dockerized db
- Unit-tests for front-end
- Migrate to TypeScript
- CI/CD pipeline
