const comments = [
  { label: "negative", text: "The product arrived damaged." },
  { label: "negative", text: "The customer service was unhelpful and rude." },
  {
    label: "negative",
    text: "The shipping was slow and the product arrived late.",
  },
  {
    label: "negative",
    text: "The product is of poor quality and not worth the price.",
  },
  { label: "negative", text: "I am very dissatisfied with my purchase." },
  { label: "negative", text: "The product arrived in poor condition." },
  { label: "negative", text: "The product doesn't work as advertised." },
  {
    label: "negative",
    text: "The packaging was poor and the product was damaged.",
  },
  {
    label: "negative",
    text: "The instructions were unclear and difficult to follow.",
  },
  { label: "negative", text: "The product is overpriced for its quality." },
  {
    label: "negative",
    text: "The product is very limited and can only be used for one purpose.",
  },
  { label: "negative", text: "The product is very flimsy and not durable." },
  {
    label: "negative",
    text: "The product is very unattractive and doesn't look good.",
  },
  { label: "negative", text: "The product arrived later than expected." },
  {
    label: "negative",
    text: "The customer support team was unresponsive and didn't help me with my questions.",
  },
  { label: "negative", text: "The product is very uncomfortable to use." },
  { label: "negative", text: "The product is very difficult to assemble." },
  { label: "negative", text: "The product is not what I needed." },
  { label: "negative", text: "The product didn't meet my expectations." },
  { label: "negative", text: "The price of the product is too high." },
  {
    label: "negative",
    text: "The product is very inefficient and wastes my time.",
  },
  {
    label: "negative",
    text: "The product is very ineffective and doesn't get the job done.",
  },
  {
    label: "negative",
    text: "The product is very confusing and not intuitive.",
  },
  {
    label: "negative",
    text: "The product is very unreliable and I don't trust it.",
  },
  { label: "negative", text: "The product is very noisy and bothersome." },
  {
    label: "negative",
    text: "The product is very heavy and difficult to carry.",
  },
  {
    label: "negative",
    text: "The product is very bulky and takes up too much space.",
  },
  { label: "negative", text: "The product has too many useless features." },
  {
    label: "negative",
    text: "The product is not customizable and doesn't suit my needs.",
  },
  {
    label: "negative",
    text: "The product is not versatile and can only be used for one purpose.",
  },
  {
    label: "negative",
    text: "The product is not user-friendly and difficult to navigate.",
  },
  {
    label: "negative",
    text: "The product is poorly designed and looks cheap.",
  },
  {
    label: "negative",
    text: "The product is of low quality and doesn't feel durable.",
  },
  {
    label: "negative",
    text: "The product is very weak and takes a long time to get the job done.",
  },
  {
    label: "negative",
    text: "The product is very difficult to clean and maintain.",
  },
  {
    label: "negative",
    text: "The product has a very short lifespan and breaks easily.",
  },
  {
    label: "negative",
    text: "The product doesn't fit properly and is uncomfortable to use.",
  },
  {
    label: "negative",
    text: "The product is very outdated and not up-to-date with the latest technology.",
  },
  {
    label: "negative",
    text: "The product is not worth the price and doesn't provide good value for money.",
  },
  {
    label: "negative",
    text: "The product is very frustrating to use and doesn't work properly.",
  },
  {
    label: "negative",
    text: "The product is very unreliable and frequently malfunctions.",
  },
  {
    label: "negative",
    text: "The product is very heavy and difficult to carry around.",
  },
  {
    label: "negative",
    text: "The product is very uncomfortable and not ergonomic.",
  },
  {
    label: "negative",
    text: "The product is very difficult to operate and requires a lot of effort.",
  },
  {
    label: "negative",
    text: "The product is very wasteful and not environmentally friendly.",
  },
  {
    label: "negative",
    text: "The product is very boring and doesn't provide any excitement or entertainment.",
  },
  {
    label: "negative",
    text: "The product is very generic and doesn't stand out from other similar products.",
  },
  { label: "negative", text: "The product is very fragile and easily breaks." },
  {
    label: "negative",
    text: "The product is very uncomfortable and causes pain and discomfort.",
  },
  {
    label: "negative",
    text: "The product is very complicated and difficult to use.",
  },
  {
    label: "negative",
    text: "The product is very disappointing and doesn't meet my needs.",
  },
  {
    label: "negative",
    text: "The product is very limited and can only be used for one purpose.",
  },
  {
    label: "negative",
    text: "The product is very heavy and difficult to transport.",
  },
  {
    label: "negative",
    text: "The product is very inconvenient and difficult to use.",
  },
  {
    label: "negative",
    text: "The product is very poorly made and falls apart easily.",
  },
  {
    label: "negative",
    text: "The product is very inconsistent and doesn't work reliably.",
  },
  {
    label: "negative",
    text: "The product is very confusing and difficult to understand.",
  },
  {
    label: "negative",
    text: "The product is very frustrating to use and doesn't work properly.",
  },
  {
    label: "negative",
    text: "The product is very unattractive and doesn't look good.",
  },
  { label: "negative", text: "The product is very flimsy and not sturdy." },
  {
    label: "negative",
    text: "The product is very expensive and not worth the price.",
  },
  {
    label: "negative",
    text: "The product is very inconvenient and not user-friendly.",
  },
  {
    label: "negative",
    text: "The product is very difficult to install and set up.",
  },
  {
    label: "negative",
    text: "The product is very frustrating to use and doesn't work properly.",
  },
  {
    label: "negative",
    text: "The product is very unreliable and frequently breaks down.",
  },
  {
    label: "negative",
    text: "The product is very difficult to use and not intuitive.",
  },
  {
    label: "negative",
    text: "The product is very inconsistent and doesn't work reliably.",
  },
  {
    label: "negative",
    text: "The product is very poorly made and of low quality.",
  },
  {
    label: "negative",
    text: "The product is very inconvenient and not practical.",
  },
  { label: "positive", text: "The product is exactly as described." },
  { label: "positive", text: "The customer service was very helpful." },
  {
    label: "positive",
    text: "The shipping was very fast and arrived before expected.",
  },
  {
    label: "positive",
    text: "The product is of great quality and is worth the price.",
  },
  { label: "positive", text: "I am very satisfied with my purchase." },
  { label: "positive", text: "The product arrived in perfect condition." },
  {
    label: "positive",
    text: "The product works great and exceeded my expectations.",
  },
  {
    label: "positive",
    text: "The packaging was excellent and protected the product well.",
  },
  {
    label: "positive",
    text: "The instructions were easy to follow and the product was easy to use.",
  },
  { label: "positive", text: "The product is a good value for the price." },
  {
    label: "positive",
    text: "The product is very versatile and can be used in many ways.",
  },
  {
    label: "positive",
    text: "The product is very durable and will last a long time.",
  },
  { label: "positive", text: "The product is very stylish and looks great." },
  { label: "positive", text: "The product arrived earlier than expected." },
  {
    label: "positive",
    text: "The customer support team was very responsive and helped me with my questions.",
  },
  { label: "positive", text: "The product is very comfortable to use." },
  { label: "positive", text: "The product is very easy to assemble." },
  { label: "positive", text: "The product is exactly what I needed." },
  { label: "positive", text: "The product exceeded my expectations." },
  { label: "positive", text: "The price of the product is very reasonable." },
  {
    label: "positive",
    text: "The product is very efficient and saves me time.",
  },
  {
    label: "positive",
    text: "The product is very effective and gets the job done.",
  },
  { label: "positive", text: "The product is very intuitive and easy to use." },
  { label: "positive", text: "The product is very reliable and I trust it." },
  {
    label: "positive",
    text: "The product is very quiet and doesn't make much noise.",
  },
  {
    label: "positive",
    text: "The product is very lightweight and easy to carry.",
  },
  {
    label: "positive",
    text: "The product is very compact and doesn't take up much space.",
  },
  { label: "positive", text: "The product has many useful features." },
  {
    label: "positive",
    text: "The product is very customizable and can be tailored to my needs.",
  },
  {
    label: "positive",
    text: "The product is very versatile and can be used for many different purposes.",
  },
  {
    label: "positive",
    text: "The product is very user-friendly and easy to navigate.",
  },
  {
    label: "positive",
    text: "The product is very well-designed and looks great.",
  },
  {
    label: "positive",
    text: "The product is very high quality and feels durable.",
  },
  {
    label: "positive",
    text: "The product is very powerful and gets the job done quickly.",
  },
  {
    label: "positive",
    text: "The product is very easy to clean and maintain.",
  },
  {
    label: "positive",
    text: "This product is exactly what I needed and works perfectly.",
  },
  {
    label: "positive",
    text: "The product arrived quickly and was well-packaged.",
  },
  {
    label: "positive",
    text: "I'm very impressed with the quality of this product.",
  },
  {
    label: "positive",
    text: "This product is very user-friendly and easy to operate.",
  },
  {
    label: "positive",
    text: "I love how versatile this product is and how many uses it has.",
  },
  {
    label: "positive",
    text: "The customer service for this product is excellent and very helpful.",
  },
  { label: "positive", text: "The product is very durable and built to last." },
  {
    label: "positive",
    text: "The product exceeded my expectations and is a great value for the price.",
  },
  {
    label: "positive",
    text: "This product has made my life so much easier and more convenient.",
  },
  {
    label: "positive",
    text: "I'm very happy with my purchase and would definitely recommend this product to others.",
  },
  {
    label: "positive",
    text: "The design of this product is very sleek and modern.",
  },
  { label: "positive", text: "The product is very intuitive and easy to use." },
  {
    label: "positive",
    text: "This product has a lot of great features and functions.",
  },
  {
    label: "positive",
    text: "The product is very reliable and always works as expected.",
  },
  {
    label: "positive",
    text: "The product is very lightweight and easy to carry around.",
  },
  {
    label: "positive",
    text: "This product is very high-quality and well-made.",
  },
  {
    label: "positive",
    text: "I'm very satisfied with this product and would buy it again in the future.",
  },
  {
    label: "positive",
    text: "The product comes with a lot of helpful instructions and guides.",
  },
  {
    label: "positive",
    text: "The product is very versatile and can be used in a variety of situations.",
  },
  {
    label: "positive",
    text: "The product is very affordable and provides excellent value for the price.",
  },
];

module.exports = comments;
