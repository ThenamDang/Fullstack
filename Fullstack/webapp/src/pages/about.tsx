import React from 'react';
import './about.css'
import bagelBoy from '../images/bagelboyimage.svg';


const About = () => {
  return (
    <div>
      <h1 className='title'>About</h1>
      <img src={bagelBoy} alt="Bagel" className='pic' />
      <div className='contentcontainer'>
        <div>
        <h2 className='content'>Virgile developed his taste for bagels living in New Jersey until the age of 19.
       It was common growing quickly to a 1m95, that his mom tried to feed him a large amount of food.
        A very fast growing man, she ran to the bagel bakery down the street to get his special bagel with Taylor ham, egg and cheese
         almost every morning before rushing to High School.</h2>

      <h2 className='content'>Born from a Finnish father, Virgile performed his Army service in the Finnish armed services
          and specialized as a soldier chef. His French mom supported his love for food and making elaborate sauces.</h2>

      <h2 className='content'>Now living in Finland, his passion for bagels stayed with him and when he couldn't find one in Tampere he decided to make some himself.
             That's when he transformed his mother's kitchen into a bagel bakery while also attending Tredu.</h2>

      <h2 className='content'>During this time, he also developed his palate and discovered new tastes in Finnish cuisine. His hands would make bagels even in his sleep.</h2>
        </div>
        <div>
        <h2 className='content'>His love of making good food will transfer to anything he touches. All the bagels are handmade and baked fresh daily.</h2>

<h2 className='content'>
  Virgile developed his taste for New Jersey bagels until he was 19 years old. Quickly growing to a height of 195cm,
   it was common for his mother to prepare large quantities of food for him. The fast-growing young man loved his special
    bagel with Taylor ham, egg and cheese, which either parent would pick up in the mornings from the bagel bakery on the bay.
     A great breakfast almost every morning before Virgile ran to high school.
</h2>

<h2 className='content'>As the son of a Finnish father, Virgile completed his army service in Finland and specialized as a military chef.
   His French mother supported his love of food and making interesting sauces. Now living in Finland,
    his passion for bagels remained, and when he couldn't find any in Tampere, he decided to make them himself.</h2>

<h2 className='content'>
That's when he turned his mother's kitchen into a bagel bakery while he studied the restaurant business at Tredu. 
During this time, he also developed his taste and discovered new ideas about Finnish cuisine. His hands were trembling even in his sleep.
</h2>
<h2 className='content'>
Her love of cooking good food is transferred to everything she touches. All Bagels are handmade and baked fresh daily.
</h2>
        </div>
      </div>
    </div>
  );
};

export default About;