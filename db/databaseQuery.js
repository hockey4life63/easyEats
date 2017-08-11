const db = require("../models");
const bcrypt = require("bcrypt");
const checkToken = require("../password_auth/acctManager").checkUuid;
//const Promise = require("bluebird");

const _buildCommentTree = (commentArray, callback) => {
    let returnArray = [];
    //loop thru all comments
    for (let element in commentArray) {
        //if a root level comment(comment directly on recipe)
        if (element.reply_to === "root") {
            //add as a array to returnArray
            returnArray.push([element])
        } else {
            //else find index of its parent comment
            let commentTreeIndex = returnArray.findIndex((comment) => {
                return comment.id.toString() === element.reply_to
            })
            //add to parent coment's array
            returnArray[commentTreeIndex].push(element)
        }
    }
    callback(returnArray)
}

const _addPrecentSigns = (word) => {
    return "%" + word + "%";
}

const _buildObject = (property) => {
    return function(string) {
        let retObj = {};
        retObj[property] = _addPrecentSigns(string);
        return retObj;
    }
}

const _wrapInObject = (objectKey, object) => {
    let retObj = {};
    retObj[objectKey] = object;
    return retObj;
}
const _convertToRenderObject = (recipe) => {
    let retArr = {
        title: recipe.title,
        thumbnail: recipe.img_url,
        href: "#",
        ingredients: recipe.ingredients
    }

    retArr.thumbnail = (retArr.thumbnail && retArr.thumbnail.match(/\.(jpeg|jpg|gif|png)$/)) ? retArr.thumbnail : "/public/assets/img/placeholder.png"

    if (recipe.User.dataValues.name) {
        retArr.userName = recipe.User.dataValues.name
        retArr.UserId = recipe.User.dataValues.id
    }
    return retArr;
}

const findRecipeId = (recipeObj, callback) => {
    db.Recipe.findOrCreate({
        where: {
            source_url: recipeObj.source_url
        },
        defaults: {
            title: recipeObj.title,
            ingredients: recipeObj.ingredients,
            img_url: recipeObj.img_url,
        }
    }).then(results => {
        callback(results[0].id)
    })
}

const addStar = (starObj, token, callback) => {
    checkToken(token, (results, err) => {
        if (err) {
            callback("invlaid token", true)
        } else {
            db.Stared.create(starObj).then(results => {
                callback(results)
            }).catch((error) => {
                callback(error, true)
            })
        }
    })

}

const addRecipe = (recipeObj, token, callback) => {
    checkToken(token, (results, err) => {
        if (err) {
            callback(results, true)
        } else {
            db.Recipe.create(recipeObj).then((results) => {
                callback(results);
            }).catch((err) => {
                callback(err, true)
            })
        }
    })

}

const addComment = (commentObj, token, callback) => {
    checkToken(token, (results, err) => {
        if (err) {
            callback(results, true)
        } else {
            db.Comment.create(commentObj).then((results) => {
                callback(results)
            }).catch((err) => {
                callback(err, true)
            })
        }
    })

}

const getAllComments = (recipe_id, callback) => {
    db.Comment.findAll({
        where: {
            recipe_id
        },
        order: [
            ["createdAt", "DESC"]
        ]
    }).then(comments => {
        _buildCommentTree(comments, (results) => {
            callback(results)
        })
    }).catch((err) => {
        callback(err, true)
    })
}


const findRecipe = (recipe_id, callback) => {
    db.Recipe.findById(recipe_id).then((result) => {
        callback(result)
    }).catch((err) => {
        callback(err, true)
    })
}

const findUserRecipe = (name, callback) => {
    db.Recipe.findAll({
        include: {
            model: db.User,
            where: {
                name
            }
        }
    }).then(results => {
        results = results.map(_convertToRenderObject);
        callback(results)
    }).catch((err) => {
        callback(err, true)
    })
}

const findUserId = (username, callback) => {
    db.User.findOne({
            where: {
                name: username
            }
        }).then(results => callback(results.id))
        .catch((err) => {
            callback(err, true)
        })
}


const findUserRecipeByName = (username, callback) => {
    findUserId(username, (UserId, err) => {
        if (err) {
            callback({
                msg: "database err",
                success: false
            }, true)
        }
        db.Recipe.findAll({
            where: {
                UserId
            }
        }).then(results => {
            callback(results)
        }).catch((err) => {
            callback(err, true)
        })
    })

}

const findUserRecipeByIngredient = (ingredients, callback) => {
    let buildOrArr = _buildObject("$like")
    const andArr = ingredients.map((element) => {
        console.log(element)
        return _wrapInObject("ingredients", buildOrArr(element))
    });
    console.log(andArr)
    db.Recipe.findAll({
        where: {
            $and: {
                user_recipe: true,
                $or: andArr
            }
        }
    }).then((results) => {
        results = results.map(_convertToRenderObject);
        callback(results)
    }).catch(err => callback(err, true))
}

const findUserRecipeByIngredientAndName = (ingredients, name, callback) => {
    let buildOrArr = _buildObject("$like")
    const andArr = ingredients.map((element) => {
        console.log(element)
        return _wrapInObject("ingredients", buildOrArr(element))
    });
    db.Recipe.findAll({
        where: {
            $and: {
                user_recipe: true,
                $or: andArr,
            }
        },
        include: {
            model: db.User,
            where: {
                name
            }
        }
    }).then((results) => {
        results = results.map(_convertToRenderObject);
        callback(results)
    }).catch(err => callback(err, true))
}

const findUserRecipeByUserAndRecipe = (name, recipeName, callback) => {
    let buildOrArr = _buildObject("$like")
    let recipeNameObj = buildOrArr(recipeName)
    db.Recipe.findAll({
        where: {
            $and: {
                user_recipe: true,
                title: recipeNameObj
            }
        },
        include: {
            model: db.User,
            where: {
                name
            }
        }
    }).then((results) => {
        results = results.map(_convertToRenderObject);
        callback(results)
    }).catch(err => callback(err, true))
}

const findUserRecipeByAll = (ingredients, name, recipeName, callback) => {
    let buildOrArr = _buildObject("$like")
    const andArr = ingredients.map((element) => {
        console.log(element)
        return _wrapInObject("ingredients", buildOrArr(element))
    });
    let recipeNameObj = buildOrArr(recipeName)
    db.Recipe.findAll({
        where: {
            $and: {
                user_recipe: true,
                $or: andArr,
                title: recipeNameObj
            }
        },
        include: {
            model: db.User,
            where: {
                name
            }
        }
    }).then((results) => {
        results = results.map(_convertToRenderObject);
        callback(results)
    }).catch(err => callback(err, true))
}

const findRecipeStarCount = (RecipeId, callback) => {
    db.Stared.count({
        where: {
            RecipeId
        }
    }).then((results) => {
        callback(results)
    }).catch((err) => {
        callback(err, true)
    })
}

// const findUserStaredRecipes = (UserId, callback)=> {
//     //find id of all recipeds stared by user
//     db.Stared.findAll({
//         where:{
//             UserId
//         }
//     }).then((results)=>{
//         let retArr = []
//         let count = 0;
//         //create array of promises
//         results.forEach( (element, index)=>{
//             retArr.push(db.Recipe.findById(element.RecipeId))
//         });
//         //wait for all to resolve
//         Promise.all(retArr).then((results)=>{
//             //pull out just curent data
//             results = results.map((element)=>{
//                 return element.dataValues
//             })
//             //use callback with results
//             callback(results)
//         })

//     }).catch((err)=>{
//         callback(err, true)
//     })
// }


const findUserStaredRecipes = (UserId, callback) => {
    db.Stared.findAll({
        where: {
            UserId
        },
        include: {
            model: db.Recipe
        }
    }).then((results) => {
        results = results.map(element => element.Recipe)
        callback(results)
    }).catch((err) => {
        callback(err, true)
    })
}

const _testAddUser = () => {
    let objArray = [{
            name: "testUser1",
            pw_hash: bcrypt.hashSync("test123", 10)
        },
        {
            name: "testUser2",
            pw_hash: bcrypt.hashSync("test123", 10)
        }
    ]
    objArray.forEach(function(element, index) {
        db.User.create(element)
    });

}

const _testAddRecipe = () => {
    let objArray = [{
            title: "test1 article1",
            ingredients: "test1,test2,test3",
            img_url: "test1 img",
            source_url: "test1 src url",
            user_recipe: true,
            UserId: 1
        },
        {
            title: "test1 article2",
            ingredients: "test1",
            img_url: "test2 img",
            source_url: "test2 src url",
            user_recipe: true,
            UserId: 2
        },
        {
            title: "test1 article3",
            ingredients: "test2",
            img_url: "test3 img",
            source_url: "test3 src url",
            user_recipe: true,
            UserId: 2
        },
        {
            title: "test1 article3",
            ingredients: "test3",
            img_url: "test3 img",
            source_url: "test3 src url",
            user_recipe: true,
            UserId: 3
        }
    ]
    objArray.forEach(function(element, index) {
        db.Recipe.create(element)
    });

}

const _testAddStared = () => {
    let objArray = [{
            RecipeId: 1,
            UserId: 1
        },
        {
            RecipeId: 3,
            UserId: 1
        },
        {
            RecipeId: 2,
            UserId: 1
        },
        {
            RecipeId: 1,
            UserId: 2
        },
        {
            RecipeId: 3,
            UserId: 2
        }
    ]
    objArray.forEach(function(element, index) {
        db.Stared.create(element)
    });

}

module.exports = {
    testUser: _testAddUser,
    testRecipe: _testAddRecipe,
    testStared: _testAddStared,
    findUserStaredRecipes,
    findRecipeStarCount,
    addStar,
    addRecipe,
    addComment,
    getAllComments,
    findRecipe,
    findUserRecipe,
    findUserRecipeByName,
    findUserRecipeByIngredient,
    findUserRecipeByIngredientAndName,
    findUserRecipeByUserAndRecipe,
    findUserRecipeByAll
}