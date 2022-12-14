import React, { useState, useEffect } from "react";
import EquipmentCard from "../Widgets/EquipmentCard";



function Equipment() {

  const [equipment, setEquipment] = useState([]);
  const [img, setImg] = useState();
  
  // in best chase i would be able to parse the datas text and img into this function. But dont know how to

  useEffect(() => {
    fetch("/api/get_equipment").then(res => res.json()).then(data => {
      console.log(" datas from db " + data);
      setEquipment(data);
    });
  }, []);

  
  // additional I tried to creat a sperate function to just parse the image over and set it to the Image in the EquipmentCard
  // This is the part i cant get done
  // a hook works for one image but i will have many, that wont be connected 
  async function get_equipment_img(equipment) {    
    const res = await fetch("/api/get_equipment_img/" + equipment);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    console.log("imageObjectURL: " + imageObjectURL);

    var reader = new FileReader();
    reader.readAsDataURL(imageBlob); 
    reader.onloadend = function() {
    var base64data = reader.result;                
    // console.log(base64data);
    return base64data;
    // setImg(base64data);

    }
    // return imageObjectURL;
  }; 


  useEffect(() => {
    get_equipment_img("ice-lake.jpg");
  }, []);

  const style = {
    background: "red",
  }
  // <body style={style}>

  
/////////// I dont know how to parse the img to image_link={get_equipment_img(item.img_name)} in the EquipmentCard
////////// Tried 1000 ways, but cant get it.

  return (
    <body className="body-background-image" style={{ backgroundImage: "url(/static/ice-lake.jpg)" }}>
    <section id="equipment"  >
    <div className="container-fluid" >
      <h1>Mein Equipment</h1>
      <h4>Das ist meine Ausrütung die ich auf meine Reisen mitnehme.</h4>
    </div>
    <div className="container-fluid" >
    {
    }
      {equipment.map((item, index) => (
        <EquipmentCard 
          key={index} 
          // image_link={item.img_name}
          image_link={get_equipment_img(item.img_name)}
          // image_link={image}
          title={item.title}
          description={item.description}
          link={item.link}
        />
      ))}
    </div>
    </section>
    </body>
  );
}

export default Equipment;
