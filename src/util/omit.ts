
export function omit(obj: any, keys: string[]) {
    let target: any = {};
    
    for (let i in obj) { 
        if (keys.indexOf(i) >= 0) {
            continue; 
        }

        if (!obj.hasOwnProperty(i)) {
            continue; 
        }


        target[i] = obj[i]; 
    }

    return target; 
}
