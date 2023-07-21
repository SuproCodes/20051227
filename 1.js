const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());

let authorizationToken = '';

const registerWithRailwayServer = async(requestData) => {
    try{
        const response = await axios.post('http://20.244.56.144/train/register',requestData);
        return response.data;
    }catch(error){
        console.error('Error during registration:', error.response ? error.response.data : error);
        throw error;
    }
};

const authenticateWithRailwayServer = async(requestData) => {
    try{
        const response = await axios.post('http://20.244.56.144/train/auth',requestData);
        return response.data;
    } catch(error){
        console.error('Error during authentication:', error.response ? error.response.data : error);
        throw error;
    }
};

const fetchAllTrainDetails = async() => {
    const response = await axios.get('http://20.244.56.144/train/trains',{
        headers: {Authorization: authorizationToken},
    });
    return response.data;
};

const fetchTrainDetails = async(trainId) => {
    const response = await axios.get(`http://20.244.56.144/train/trains/${trainId}`, {
        headers: {Authorization: authorizationToken}, 
    });
    return response.data;
};

app.post('/train/register', async(req, res) => {
    try{
        const { comapnyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;
        if(!comapnyName || !ownerName || !rollNo || !ownerEmail || !accessCode){
            return res.status(400).json({ error: 'All fields are required' });
        }
        const requestData = {
            comapnyName,
            ownerName,
            rollNo,
            ownerEmail,
            accessCode,
        };
        const { token } = await registerWithRailwayServer(requestData);
        authorizationToken = token;
        res.json({ message: 'Company registered successfully', token});
    }catch(error){
        console.error('Error registering company:',error);
        res.status(500).json({ error: 'Error registering company' });
    }
});

app.post('/train/auth', async(req, res) => {
    try{
        const { rollNo, accessCode } = req.body;
        const requestData = {
            rollNo,
            accessCode,
        };

        const { token } = await authenticateWithRailwayServer(req.body);
        authorizationToken = token;
        res.json({ message: 'Authorization token obtained successfully', token});
    }catch(error){
        console.error('Error obtaining authorization token:',error);
        res.status(500).json({ error: 'Error obtaining authorization token' });
    }
});

const checkAuthorizationToken = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token || token !== authorizationToken){
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    next();
};

app.get('/train/trains', checkAuthorizationToken, async(req, res) => {
    try{
        const trainsData = await fetchAllTrainDetails();
        res.json(trainsData);
    }catch(error){
        console.error('Error fetching train details:',error);
        res.status(500).json({ error: 'Error fetching train details' });
    }
});

app.get('/train/trains/:trainId', checkAuthorizationToken, async(req, res) => {
    try{
        const trainId = req.params.trainId;
        const trainDetails = await fetchTrainDetails(trainId);
        res.json(trainDetails);
    }catch(error){
        console.error('Error fetching train details:',error);
        res.status(500).json({ error: 'Error fetching train details' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});