//jshint esversion:6

const express = require("express");
const app = express();
app.use(express.static("public"));


// To retrive data from the body of the Webpage
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// We ar also using the EJS. 
const ejs = require("ejs");
app.set('view engine', 'ejs');

// requiring the lodash module to use its _.lowerCase() functionality
const _ = require("lodash");


const posts = [
  {
  title:"Example Blog", 
  content:"Welcome to Blog World! This is a demo blog post on our website, designed to showcase the functionality of our platform. Feel free to explore and navigate through our various sections, and when you're ready, click on the 'Compose' button located in the header section to unleash your creativity and start crafting your very own blog post." }, 
  {
  title: "Scientists Unearth a 30,000-Year-Old Relationship With Humans",
  content:"Scientists from the University of Tübingen and the Senckenberg Centre for Human Evolution and Palaeoenvironment examine human-raven relationships. Long before the establishment of the first Neolithic settlements around 10,000 years ago, humans and wild animals had already formed diverse relationships. An international study conducted by experts from the Universities of Tübingen, Helsinki, and Aarhus offers new insights into these interactions. They provide evidence showing that over 30,000 years ago, during the Pavlovian culture, ravens helped themselves to people’s scraps and picked over mammoth carcasses left behind by human hunters. This took place in the region known today as Moravia, in the Czech Republic. The large number of raven bones found at the sites suggests that the birds, in turn, were a supplementary source of food, and may have become important in the culture and worldview of these people"}
];


const homeStartingContent = "Welcome to The Blog World Website!<br>We are delighted to have you here, where we strive to bring you a diverse collection of captivating and informative articles. Explore our curated content, dive into intriguing topics, and embark on a journey of knowledge and inspiration. Get ready to expand your horizons and indulge in the world of captivating storytelling and insightful perspectives.<br>Happy reading!";

const aboutContent = "Welcome to Blog World, your go-to destination for insightful articles, captivating stories, and thought-provoking discussions. As the founder and creator of this platform, I'm Aditya Kakade, and I am passionate about sharing knowledge, experiences, and perspectives that inspire and empower readers like you.<br><br>With a background in software development and a deep curiosity for the world around us, I aim to create a space where ideas flourish, conversations thrive, and readers find valuable content that enriches their lives. Whether you're seeking informative articles, personal anecdotes, or practical advice, Blog World is here to serve as a trusted resource.<br><br>Our team of dedicated writers and contributors brings expertise from various fields, ensuring a diverse range of topics and perspectives. From technology and lifestyle to travel and personal growth, we cover a wide array of subjects that resonate with our readers.<br><br>We believe in the power of storytelling and its ability to foster connection and understanding. Through our engaging narratives, we aim to inspire, entertain, and spark meaningful conversations among our readers. We encourage you to explore our articles, leave your thoughts in the comments section, and join the vibrant community that is Blog World.<br><br>Thank you for visiting Blog World. We are committed to delivering high-quality content that informs, entertains, and leaves a lasting impact. Join us on this journey of discovery and exploration as we navigate through the fascinating realms of knowledge and inspiration together.<br><br>Stay curious, stay engaged, and let the adventure begin!<br><br>Sincerely,<br>Aditya Kakade<br>Founder of Blog World";

const contactContent = "Contact Us<br><br>We would love to hear from you! Please feel free to reach out to us with any questions, feedback, or inquiries. You can contact us using the following methods:<br><br>Email: info@blogworld.com<br>Phone: +1 (123) 456-7890<br>Address: 123 Main Street, City, State Country<br><br>";



app.get("/", function (req,res) {
  // rendering home.ejs when the home req for route has been initiated.
  res.render("home", {
    varHomeContent:homeStartingContent,
    blogs:posts
  });
});

app.get("/about", function (req,res) {
  res.render("about", {varAboutContent:aboutContent});
});

app.get("/contact", function (req,res) {
  res.render("contact", {varContactContent:contactContent});
});


app.get("/posts/:postTitle", function (req,res) {
  // converting the post title into a simple lower case string.
  let requestedTitle = _.lowerCase(req.params.postTitle);

  let storedTitle;
  // travering through each element of the posts array to find the requested post
  // and to render it using post.ejs, thus displaying the relevent data. 
  posts.forEach(element => {
    storedTitle = _.lowerCase(element.title);
    if(storedTitle == requestedTitle){
      res.render("post", {
        blogTitle : element.title,
        blogContent : element.content
      });
    }
  });
});

// this code will direct you to compose.ejs page, when compose is pressed
app.get("/compose", function (req,res) {
  res.render("compose");
});

app.post("/compose", (req,res)=>{
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

