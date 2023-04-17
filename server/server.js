const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const path = require('path')
// const {authM} =require('./utils/auth')
const {typeDefs, resolvers} = require('./Schemas')
const db = require('./config/config')
const ap = express()
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:,
})

ap.use(express.urlencoded({extended: false}))
ap.use(express.json());

if (process.env.NODE_ENV === 'production') {
    ap.use(express.static(path.join(__dirname, '../client/build')))
}

ap.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

const apolloServerStart = async (typeDefs, resolvers) =>{
    await server.start();
    server.applyMiddleware({ap});
    db.once('once', () => {
        ap.listen(PORT, () => {
            console.log(`API on ${PORT}`);
            console.log(`GraphQl on http://localhost:${PORT}${server.graphqlPath}`)
        })
    })
}

apolloServerStart(typeDefs, resolvers);