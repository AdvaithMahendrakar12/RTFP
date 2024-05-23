
class ApiFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
    }
  
    search() {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: "i",
            },
          }
        : {};
  
      this.query = this.query.find({...keyword });
      return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["page", "limit"];
    
        if (queryCopy.keyword) {
            removeFields.push("keyword");
        }
    
        removeFields.forEach((key) => delete queryCopy[key]);
    
        // Filter for price
        
        let queryStr = JSON.stringify(queryCopy);
        console.log(queryStr);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage){
        const current = Number(this.queryStr.page) || 1; 

        const skip = resultPerPage * (current -1); 
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
    
  }
  

module.exports = ApiFeatures; 