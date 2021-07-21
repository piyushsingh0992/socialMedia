


export function getUserInfoLocal(){

}


export function logInLocal(userDetails){
    localStorage.setItem("userDetails",JSON.stringify(userDetails));
}

export function logOutLocal(){
    localStorage.removeItem("userDetails");
}


export function addPostLocal(postId){
    let userDetails = JSON.parse(localStorage.getItem("userDetails"));
      userDetails.userDetails.posts.push(postId);
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
}

export function removePostLocal(){

}


export function addFollowerLocal(){

}

export function removeFollowerLocal(){

}


export function addFollowingLocal(){

}

export function removeFollowingLocal(){

}