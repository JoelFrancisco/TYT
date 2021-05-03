import { Router } from "express"
import test from './repositories/implemantation/test'

const router = Router()

router.get('/', (request, response) => {
    return response.status(200).send({"message": "Test"});
})

router.post('/users', (request, response) => {
    return response.status(201).send();
})

router.get('/test', (request, response) => {
    return 201
})

export { router }