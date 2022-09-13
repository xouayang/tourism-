const cloudinary = require('cloudinary')
    cloudinary.config({ 
        cloud_name: 'travellaos', 
        api_key: '594491792194882', 
        api_secret: 'LUDGcWtNBjlOf8BXXaWWgGU1ayo' 
      });

      exports.uploads = (file,folder) => {
        return new Promise(resolve => {
          cloudinary.uploader.upload(file,(result) => {
           resolve({
            url:result.url,
            id:result.public_id
           }) 
          },{
            resource_type:"auto",
            folder:folder
          })
        })
      }