import classes from './Scoped.module.css';

const Scoped=()=>{
    console.log(classes);
    return (
        <>
        <p className={classes.para1}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae ad expedita veniam natus aliquam nam.</p>
        <p className={classes.para2}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem nemo illo facilis suscipit ratione repellendus reprehenderit deleniti at voluptatibus, placeat deserunt, autem ad, magni ab obcaecati quos numquam molestiae eum!</p>
        </>
    )
}

export default Scoped;