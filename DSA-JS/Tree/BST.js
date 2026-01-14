// BST
// left-node<root<right-node 

class Node{
    constructor(value){
        this.value=value;
        this.left=null;
        this.right=null;
    }
}

class BST{
    constructor(){
        this.root=null;
    }

 insert(value){
        var newNode=new Node(value)
        if(this.root===null){
            this.root=newNode
            return this;
        }
        let current=this.root;
        while(current){
        if(current.value===value){
            return undefined;
        }
        if(current.value>value){
           if(current.left === null){
                    current.left = newNode;
                    return this;
                }
                current = current.left;
        }else{
           if(current.right === null){
                    current.right = newNode;
                    return this;
                } 
                current = current.right;
    }
    }
    // Inorder(root){
    //     if (root!=null) {
    //         this.Inorder(root.left)
    //         console.log(root.value);
    //         this.Inorder(root.right);
    //     }
    // }
}
    find(value) {
        if (!this.root) return false;
        let current = this.root;
        let found = false;
        while (current && !found) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = current;
            }
        }
        if (!found) return undefined;
        return found;
    }
    inorderTraversal() {
        const result = [];
        function traverse(node) {
            if (node) {
                traverse(node.left);
                result.push(node.value);
                traverse(node.right);
            }
        }
        traverse(this.root);
        return result;
    }
}

// let root=new Node(20)
// root.left=new Node(15);
// root.right=new Node(30);
// root.left.left=new Node(12)
// root.left.right=new Node(12)
// process.stdout.write(root.Inorder(root)+"/n");
// console.log(root);

let bst = new BST();
bst.insert(20)
bst.insert(15);
bst.insert(30);
bst.insert(12);
bst.insert(18); 

console.log("Inorder Traversal Result:", bst.inorderTraversal());
console.log("Full BST Object:", bst);
console.log("Finding Value",bst.find(30));
