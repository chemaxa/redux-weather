export default{
    getState:(key)=>{
        return JSON.parse(localStorage.getItem(key)) || {};
    },
    setState:(key,data)=>{
        localStorage.setItem(key,JSON.stringify(data));
    }
}