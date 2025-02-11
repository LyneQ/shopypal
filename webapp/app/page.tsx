import HeroBanner from "@/components/Hero-banner/HeroBanner";
import '@/styles/pages/hero.scss'
import { ShoppingItem } from "@/utils/item";
import React from "react";
import Item from "@/components/Shop/Item";

export default async function Home() {

    return (
        <>
            <HeroBanner/>
            <h1 className={"center wrapper"}> view a selection of our best seller </h1>
            <section className={'container'}>
                {
                    Array.from({length: 5}).map(async (_, i) => (
                        <Item key={i} data={await new ShoppingItem(i+=1)?.getProduct()}/>
                    ))
                }
            </section>

        </>
    );
}