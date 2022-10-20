# Flask Part

# a route to create a new equipment and store it in the db
@app.route('/api/create_equipment', methods=['POST'])
def create_equipment():
    title = request.form['title']
    description = request.form['description']
    image_link = request.form['image_link']
    link = request.form['link']
    img = request.files['img']

    filename = secure_filename(img.filename)
    mimetype = img.mimetype

    if not filename or not mimetype:
        return 'Bad upload!', 400

    new_equipment = Equipment(title=title,
                              description=description,
                              image_link=image_link,
                              link=link,
                              img=img.read(),
                              img_name=filename,
                              mimetype=mimetype)
    db.session.add(new_equipment)
    db.session.commit()
    return {'message': 'Equipment created'}
    
# Here can send the text datas to the react frontend but cant find a way to parse the img over, thats why i create another route to read the img seperatly

# a route for the frontend to get the all equipments  stored by /api/create_equipment in the db
@app.route('/api/get_equipment', methods=['GET'])
def get_equipment():
    equipment = Equipment.query.all()
    equipment_list = []
    for item in equipment:
        equipment = Equipment.query.filter_by(title=item.title).first()

        equipment_list.append(
            {'title': item.title,
             'description': item.description,
             'image_link': item.image_link,
             # 'img': equipment.img,
             'img_name': equipment.img_name,
             'mimetype': equipment.mimetype,
             'link': item.link}
        )

    return jsonify(equipment_list)
    

# Route to just read the img by the name
@app.route('/api/get_equipment_img/<string:img_name>', methods=['GET'])
def get_equipment_img(img_name):
    equipment = Equipment.query.filter_by(img_name=img_name).first()
    # print(equipment.img)
    if equipment:
        print("equipment.img returned")
        # return send_file(BytesIO(equipment.img), mimetype=equipment.mimetype)
        return Response(equipment.img, mimetype=equipment.mimetype)
    else:
        print("equipment.img returned")
        return 'Image not found!', 404
    
    
