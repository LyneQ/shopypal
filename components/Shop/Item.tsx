import {QueryResult} from "mysql2";
import '@/styles/components/shop/item.scss'

export default function Item({ data }: { data: QueryResult }) {

    // @ts-ignore
    const [rows] = data;
    
    console.log(rows)

    if (!rows) {
        return <div>Aucun article trouvé.</div>;
    }

    return (
        <article className={"item"}>
            <h2 className={'title'}>{rows.name}</h2>
            <p>Price: <span className={'price'}>${rows.price}</span></p>
            <p className={'description'}>{rows.description}</p>
            {/*<img src={rows.image} alt={rows.name}/>*/}
            <img src={'https://fakeimg.pl/250x250/000/fff/?text=Image'} alt={rows.name}/>
            <button>Add to Cart</button>
        </article>
    );
}