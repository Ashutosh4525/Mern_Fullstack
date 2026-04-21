function twoSum(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];

        if (map.has(diff)) {
            return [map.get(diff), i];
        }

        map.set(nums[i], i);
    }

    return [];
}

console.log(twoSum([2,7,11,15], 9));

function findPairs(nums, target){
    const seen=new Set();
    const result=new Set();

    for(let num of nums){
        const diff=target - num;

        if (seen.has(diff)) {
            const pair=[Math.min(num, diff), Math.max(num, diff)];
            result.add(pair.toString());
        }
        seen.add(num);

    }
    return Array.from(result).map(str => str.split(',').map(Number));
}

console.log(findPairs([1,2,3,2,4,3], 5));

// let set= new Set([1,2,3,4,3]);
// console.log(set);
// console.log(set.add(5));
// console.log(set.has(6));

// let map=new Map();
// map.set("name","Alice");
// map.set(1,"value");
// map.set("key",2);

// console.log(map);
// console.log(map.get(1));
// console.log(map.values());
// console.log(map.has("value"));
// console.log(map.has(1));


function longestSubarray(nums, k) {
    const sum=new Map();
    let res=0;
    let prefSum=0;

    for (let i = 0; i < nums.length; i++) {
        prefSum += nums[i];

        if (prefSum === k) 
            res = i + 1;

        else if (sum.has(prefSum - k)) 
            res = Math.max(res, i - sum.get(prefSum - k));

        if (!sum.has(prefSum)) 
            sum.set(prefSum, i);
    }
    return res;
}
console.log(longestSubarray([1, -1, 5, -2, 3], 3));



function maxArea(height) {
    let left=0;
    let right=height.length-1;

    let maxAreaVal=0;

    while(left<right){
        const width=right-left;
        const eachHeight=Math.min(height[left],height[right]);
        const area=width*eachHeight;
        maxAreaVal=Math.max(maxAreaVal,area);

        if (height[left]<height[right]) {
            left++;
        }
        else{
            right--
        }
    }
    return maxAreaVal
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]));

function maxSubArray(nums) {
    let max=nums[0];
    let sum=nums[0];

    for (let i = 1; i < nums.length; i++){
        sum=Math.max(sum+nums[i],nums[i])
        // console.log(sum);

       max=Math.max(max,sum)
    }
    return max;
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
console.log(maxSubArray([-5, -2, -8]));
