'use client';
import '@/styles/components/Hero.scss'

export default function HeroBanner() {
    const reviewNumber = 4;

    const generateReview = (notation: number) => {
        return Array.from({length: notation}, (_, index) => (
            <img key={index} src="/promotional/star.svg" alt="star" draggable={false}/>
        ));
    };
    
    return (
        <div className={"hero"}>
            <img src="/promotional/banner.jpg" alt="promotional banner"/>
            <div className={"hero-text"}>
                <h2 className={"review no-underline"}><span className={'stars'}>{generateReview(reviewNumber)}</span> <b>{reviewNumber.toString()}</b> stars based on <b>142</b> review  </h2>
                <p>
                    "There are so soft and cuddly, my kids absolutely love them!" " - <span className={'author'}>Camille T.</span>
                </p>
                <p>
                    "The quality of the plush materials exceeded my expectations, and they are absolutely adorable!"
                    - <span className={'author'}>James L.</span>
                </p>
            </div>
        </div>
    );
}