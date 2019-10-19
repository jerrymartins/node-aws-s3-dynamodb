const verifyJWT = require('../utils/verifyJWT');

const express = require('express');
const router = express.Router();
const {
  filmRegister,
  filmsList,
  filmById,
  filmByTitle,
  filmsBetweenYears,
  filmByYear,
  filmUpdate,
  filmDelete} = require('../services/MoviesService');

router.post('/', (req, res, next) => {
  const film = {TableName: 'Movies', ...req.body};
  filmRegister(film).then( r => {
    res.status(r.statusCode).send();
  }).catch(err => {
    res.status(err.statusCode).send(err.message);
  });
});

router.get('/', verifyJWT, (req, res, next) => {
    const paramsGet = {
      TableName: "Movies",
      Limit: 50
      };
      filmsList(paramsGet).then( r => {
        res.status(r.statusCode).send(r.data);
      }).catch(err => {
        res.status(err.statusCode).send(err.message);
      });
});

router.get('/filter/:year/:title', verifyJWT, (req, res, next) => {
    const paramsGet = {
        TableName: "Movies",
        Key:{
            "yearFilm": parseInt(req.params.year),
            "title": req.params.title
        }
    };
    filmById(paramsGet).then( r => {
      res.status(r.statusCode).send(r.data);
    }).catch(err => {
      res.status(err.statusCode).send(err.message);
    });
});

router.get('/between-years/:yearStart/:yearEnd', verifyJWT, (req, res, next) => {
  const params = {
    TableName: "Movies",
    ProjectionExpression: "#yr, title, info.rating",
    FilterExpression: "#yr between :start_yr and :end_yr",
    ExpressionAttributeNames: {
      "#yr": "yearFilm",
    },
    ExpressionAttributeValues: {
      ":start_yr": parseInt(req.params.yearStart),
      ":end_yr": parseInt(req.params.yearEnd)
    }
  };
  filmsBetweenYears(params).then( r => {
    res.status(r.statusCode).send(r.data);
  }).catch(err => {
    res.status(err.statusCode).send(err.message);
  });
});

router.get('/year/:year', verifyJWT, (req, res, next) => {
  const params = {
    TableName : "Movies",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
      "#yr": "yearFilm"
    },
    ExpressionAttributeValues: {
      ":yyyy": parseInt(req.params.year)
    }
  };
  filmByYear(params).then( r => {
    res.status(r.statusCode).send(r.data);
  }).catch(err => {
    res.status(err.statusCode).send(err.message);
  });
});

router.get('/title/:title', verifyJWT, (req, res, next) => {
  const params = {
    TableName : "Movies",
    FilterExpression: 'contains (title, :title)',
    ExpressionAttributeValues: {
      ":title": req.params.title
    }
  };

  filmByTitle(params).then( r => {
    res.status(r.statusCode).send(r.data);
  }).catch(err => {
    res.status(err.statusCode).send(err.message);
  });

});

router.put('/', verifyJWT, (req, res, next) => {
  const film = req.body;
  const params = {
    TableName: "Movies",
    Key:{
      "yearFilm": parseInt(film.Item.yearFilm),
      "title": film.Item.title
    },
    UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
    ExpressionAttributeValues:{
      ":r":5.5,
      ":p":"Everything happens all at once.",
      ":a":["Larry", "Moe", "Curly", "coronel tautau"]
    },
    ReturnValues:"UPDATED_NEW"
  };

  filmUpdate(params).then( r => {
    res.status(r.statusCode).send(r.data);
  }).catch(err => {
    res.status(err.statusCode).send(err.message);
  });

});

router.delete('/:yearFilm/:title', verifyJWT, (req, res, next) => {
  const params = {
    TableName: 'Movies',
    Key:{
      "yearFilm": req.params.yearFilm,
      "title": req.params.title
    },
    // ConditionExpression:"info.rating <= :val",
    // ExpressionAttributeValues: {
    //   ":val": 5.0
    // }
  };

  filmDelete(params).then( r => {
    res.status(r.statusCode).send(r.data);
  }).catch(err => {
    res.status(err.statusCode).send(err.message);
  });
});

module.exports = router;
