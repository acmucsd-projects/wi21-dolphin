#!/usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const async = require('async')
const Category = require('./models/category')
const Hobby = require('./models/hobby')

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = []
var hobbies = []

var art_creative = []
var traditional_sports = []
var recreational_activities = []
var food = []
var video_games = []
var board_games = []
var media = []

function hobbyCreate(name, category, cb) {
    var hobby = new Hobby({
        name: name,
        description: "This has no description yet"
    });
    
    hobby.posts = [];

    hobby.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Hobby: ' + hobby);

        if (category === "Art/Creative") {
            art_creative.push(hobby)
        }

        if (category === "Traditional Sports") {
            traditional_sports.push(hobby)
        }

        if (category === "Recreational Activities") {
            recreational_activities.push(hobby)
        }

        if (category === "Food") {
            food.push(hobby)
        }

        if (category === "Video Games") {
            video_games.push(hobby)
        }

        if (category === "Board/Tabletop Games") {
            board_games.push(hobby)
        }

        if (category === "Media/Consumption") {
            media.push(hobby)
        }

        hobbies.push(hobby)
        cb(null);
    });
}

function categoryCreate(name, hobbies) {
    var category = new Category({
        name: name,
        description: "This has no description yet",
        hobbies: hobbies
    });

    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category)
    });
}


function createHobbies(cb) {
    async.series([
        function(callback) {
            hobbyCreate("Photography", "Art/Creative", callback);
        },
        function(callback) {
            hobbyCreate("Painting/Art", "Art/Creative", callback);
        },
        function(callback) {
            hobbyCreate("Writing/Journaling", "Art/Creative", callback);
        },
        function(callback) {
            hobbyCreate("Bullet Journaling", "Art/Creative", callback);
        },
        function(callback) {
            hobbyCreate("Dance", "Art/Creative", callback);
        },
        function(callback) {
            hobbyCreate("Singing", "Art/Creative", callback);
        },
        function(callback) {
            hobbyCreate("Running/Track", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Basketball", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Soccer", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Golf", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Volleyball", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Lacrosse", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Cross Country", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Rugby", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Cricket", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Hockey", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Field Hockey", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Ultimate Frisbee", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Dirt Biking", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Skateboarding", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Skiing", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Surfing", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Swimming", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Mountain Climbing", "Traditional Sports", callback);
        },
        function(callback) {
            hobbyCreate("Hiking", "Recreational Activities", callback);
        },
        function(callback) {
            hobbyCreate("Camping", "Recreational Activities", callback);
        },
        function(callback) {
            hobbyCreate("Working Out", "Recreational Activities", callback);
        },
        function(callback) {
            hobbyCreate("Yoga", "Recreational Activities", callback);
        },
        function(callback) {
            hobbyCreate("Meditate", "Recreational Activities", callback);
        },
        function(callback) {
            hobbyCreate("Cooking", "Food", callback);
        },
        function(callback) {
            hobbyCreate("Baking", "Food", callback);
        },
        function(callback) {
            hobbyCreate("League of Legends", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Valorant", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Overwatch", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Genshin Impact", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Among Us", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("MarioKart 8", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Splatoon", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Super Smash Bros", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Minecraft", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Stardew Valley", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Terraria", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Hollow Knight", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Ori and the Blind Forest", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Celeste", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Hades", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Enter the Gungeon", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Forager", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Enter the Spire", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Legends of Runeterra", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Hearthstone", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Shadowverse", "Video Games", callback);
        },
        function(callback) {
            hobbyCreate("Settlers of Catan", "Board/Tabletop Games", callback);
        },
        function(callback) {
            hobbyCreate("Chess", "Board/Tabletop Games", callback);
        },
        function(callback) {
            hobbyCreate("Go", "Board/Tabletop Games", callback);
        },
        function(callback) {
            hobbyCreate("DnD", "Board/Tabletop Games", callback);
        },
        function(callback) {
            hobbyCreate("Monopoly", "Board/Tabletop Games", callback);
        },
        function(callback) {
            hobbyCreate("Mahjong", "Board/Tabletop Games", callback);
        },
        function(callback) {
            hobbyCreate("Poker", "Board/Tabletop Games", callback);
        },
        function(callback) {
            hobbyCreate("Uno", "Board/Tabletop Games", callback);
        },
        function(callback) {
            hobbyCreate("TV Shows", "Media/Consumption", callback);
        },
        function(callback) {
            hobbyCreate("Books", "Media/Consumption", callback);
        },
        function(callback) {
            hobbyCreate("Anime", "Media/Consumption", callback);
        },
        function(callback) {
            hobbyCreate("Manga", "Media/Consumption", callback);
        },
        function(callback) {
            hobbyCreate("Movies", "Media/Consumption", callback);
        },
        ],
        cb);
}

function createCategories(cb) {
    async.parallel([
        function(callback) {
            categoryCreate("Art/Creative", art_creative, callback);
        },
        function(callback) {
            categoryCreate("Traditional Sports", traditional_sports, callback);
        },
        function(callback) {
            categoryCreate("Recreational Activities", recreational_activities, callback);
        },
        function(callback) {
            categoryCreate("Food", food, callback);
        },
        function(callback) {
            categoryCreate("Video Games", video_games, callback);
        },
        function(callback) {
            categoryCreate("Board/Tabletop Games", board_games, callback);
        },
        function(callback) {
            categoryCreate("Media/Consumption", media, callback);
        },
        ],
        cb);
}

async.series([
    createHobbies,
    createCategories
], 
// Optional callback
function(err) {
    if (err) {
        console.log('FINAL ERR: ' + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});