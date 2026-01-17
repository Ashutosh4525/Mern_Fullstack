class Node{
    constructor(value){
        this.value=value;
        this.right=null;
        this.left=null;
    }

    preOrder(root){
        if(root!=null){
            console.log(root.value);
            this.preOrder(root.left);
            this.preOrder(root.right)

          
        }
    }

    InOrder(root){
        if (root!=null) {
            this.InOrder(root.left);
            console.log(root.value);
            this.InOrder(root.right)
        }
    }

    PostOrder(root){
        if (root!=null) {
            this.PostOrder(root.left);
            this.PostOrder(root.right)
            console.log(root.value);
        }
    }
}

  let root=new Node(1);
  root.left=new Node(3)
  root.right=new Node(5)
  root.left.left=new Node(2)
  root.left.right=new Node(4)
  root.right.right=new Node(8)
  let op=root.preOrder(root)
  console.log(op);
  let op1=root.InOrder(root)
  console.log(op1);
  let op3=root.PostOrder(root)
  console.log(op3);
  