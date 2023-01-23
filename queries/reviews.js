const db = require("../db/dbConfig");

const getAllReviews = async () => {
    try {
     allReviews = await db.any('SELECT * FROM reviews')
     return allReviews
    } catch (error) {
        return error
    }
}

const getReview = async () => {
    try {
        const oneReview = await db.one('SELECT * FROM reviews WHERE id=$1', id)
        return oneReview 
    } catch (error) {
       return error 
    }
}

//CREATE

const createReview = async (review) => {
    try {
        const newReview = await db.one("INSERT INTO reviews (bookmark_id, reviewer, title, content, rating) VALUES($1, $2, $3, $4, $5) RETURNING *",
        [review.bookmark_id, review.reviewer, review.title, review.content, review.rating])
        return newReview 
    } catch (error) {
       return error 
    }
}

//DELETE

const deleteReview = async (id) => {
    try {
      const deletedReview = await db.one('DELETE FROM reviews WHERE id=$1 RETURNING *', id)
      return deletedReview
    } catch (error) {
      return error
    }
  }

//UPDATE

const updateReview = async (id, review) => {
    try {
        const updateReview = await db.one('UPDATE reviews SET reviewer=$1, title=$2, content=$3, rating=$4 WHERE id=$5 RETURNING *', [review.reviewer, review.title, review.content, review.rating, id])
        return updateReview
    } catch (error) {
        return error
    }
}

module.exports = {getAllReviews, getReview, createReview, deleteReview, updateReview}