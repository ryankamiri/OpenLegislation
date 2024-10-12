const router = require('express').Router();

router.get('/search', async (req, res) => {
    try{
        // q: query, status: bill status
        const {q, status} = req.query;
        if (!q || !status) {
            return res.status(400).json({err: "Args missing from search."});
        }
        
        // Make request to gov

        return res.json({});
    }
    catch(err){
        return res.status(500).json({err: err.message});
    }
});

router.get('/bill/:id', async (req, res) => {
    try{
        // q: query, status: bill status
        const {id} = req.params.id;
        if (!id) {
            return res.status(400).json({err: "Id is required to get bill info."});
        }
        
        // Make request to gov
        // https://api.congress.gov/v3/bill/118/s/951?api_key=[INSERT_KEY]

        return res.json({});
    }
    catch(err){
        return res.status(500).json({err: err.message});
    }
});

module.exports = router;