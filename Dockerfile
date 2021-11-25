## BUILDING ENVIRONMENT
FROM node:14.16.1-alpine as build

# set working directory
WORKDIR /demo-be

# add `/app/node_modules/.bin` to $PATH
ENV PATH /demo-be/node_modules/.bin:$PATH

# take dependencies
COPY package.json ./
COPY package-lock.json ./

# install dependencies
RUN npm ci

#add app
COPY . .

RUN npm run build

# remove development dependencies
RUN npm prune --production

## DEPLOY ENVIRONMENT
FROM node:14.16.1-alpine

# set working directory
WORKDIR /demo-be

#take the dist folder created
COPY --from=build /demo-be/dist ./dist
COPY --from=build /demo-be/node_modules ./node_modules

#expose port
EXPOSE 3200
# run the app
CMD [ "node", "./dist/main" ]
