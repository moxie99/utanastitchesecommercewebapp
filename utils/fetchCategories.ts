export const fetchCategories = async ()=> {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getCategories`);
    const res = await fetch("/http://localhost:3000/api/getCategories");
    const data = await res.json();

    console.log(data);
};