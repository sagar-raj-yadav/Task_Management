
// 1st code -> this code in in promises

const asynccHandler=(requestHandler)=>{
  (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).
    catch((err)=>{
      next(err)
    })  
  }
}

export {asyncHandler}  
 

/* 
2nd code -> this code is in async await
fn->any function

const asyncHandler = (fn) =>async(req,res,next)=>{
  try {
    await fn(req,res,next)

  } catch (error){
    res.status(err.code||500).json({
      sucess:flase,
      message:err.message
    })
  }
} 
export {asyncHandler}
 */

