'use strict'

const db = require('../server/db')
const {User, Project, Question, Snippet} = require('../server/db/models')

const users = [
  {
    email: 'mferens0@biblegateway.com',
    password: 'CIs3tT2WdBu',
    firstName: 'Maurie',
    lastName: 'Ferens'
  },
  {
    email: 'gstanlock1@oracle.com',
    password: 'tLOeEl0Y',
    firstName: 'Glynnis',
    lastName: 'Stanlock'
  },
  {
    email: 'lfoss2@ebay.co.uk',
    password: 'w9zJnLoG',
    firstName: 'Leelah',
    lastName: 'Foss'
  },
  {
    email: 'aboaler3@gov.uk',
    password: 'ihKF1POL',
    firstName: 'Artus',
    lastName: 'Boaler'
  },
  {
    email: 'gbirkwood4@bravesites.com',
    password: '6Yn0rFvMo',
    firstName: 'Gianni',
    lastName: 'Birkwood'
  },
  {
    email: 'cberisford5@photobucket.com',
    password: 'ersWVrPj',
    firstName: 'Chlo',
    lastName: 'Berisford'
  },
  {
    email: 'okells6@dagondesign.com',
    password: 'y4RwShf',
    firstName: 'Orsola',
    lastName: 'Kells'
  },
  {
    email: 'rthatcher7@cyberchimps.com',
    password: 'G8FaYTZxDM2',
    firstName: 'Rickert',
    lastName: 'Thatcher'
  },
  {
    email: 'bmilvarnie8@purevolume.com',
    password: '1XShsFm1ipl',
    firstName: 'Barbee',
    lastName: 'Milvarnie'
  },
  {
    email: 'chertwell9@imageshack.us',
    password: 'OXs5tXPy',
    firstName: 'Cathi',
    lastName: 'Hertwell'
  }
]

const questions = [
  {
    content: 'Etiam justo.?',
    projectId: 14
  },
  {
    content:
      'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.?',
    projectId: 3
  },
  {
    content:
      'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.?',
    projectId: 12
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.?',
    projectId: 8
  },
  {
    content: 'Vivamus tortor.?',
    projectId: 15
  },
  {
    content: 'In hac habitasse platea dictumst.?',
    projectId: 17
  },
  {
    content: 'Morbi ut odio.?',
    projectId: 17
  },
  {
    content: 'Phasellus sit amet erat.?',
    projectId: 14
  },
  {
    content:
      'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.?',
    projectId: 5
  },
  {
    content: 'Mauris lacinia sapien quis libero.?',
    projectId: 17
  },
  {
    content: 'Donec ut dolor.?',
    projectId: 20
  },
  {
    content: 'In sagittis dui vel nisl.?',
    projectId: 9
  },
  {
    content: 'Duis at velit eu est congue elementum.?',
    projectId: 20
  },
  {
    content: 'Suspendisse ornare consequat lectus.?',
    projectId: 11
  },
  {
    content: 'Curabitur convallis.?',
    projectId: 11
  },
  {
    content:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.?',
    projectId: 19
  },
  {
    content:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.?',
    projectId: 3
  },
  {
    content: 'In hac habitasse platea dictumst.?',
    projectId: 10
  },
  {
    content: 'Aliquam sit amet diam in magna bibendum imperdiet.?',
    projectId: 15
  },
  {
    content:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.?',
    projectId: 2
  },
  {
    content: 'In blandit ultrices enim.?',
    projectId: 6
  },
  {
    content: 'Pellentesque ultrices mattis odio.?',
    projectId: 20
  },
  {
    content:
      'Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.?',
    projectId: 9
  },
  {
    content: 'Vestibulum rutrum rutrum neque.?',
    projectId: 17
  },
  {
    content: 'Praesent blandit.?',
    projectId: 20
  },
  {
    content: 'Nunc nisl.?',
    projectId: 4
  },
  {
    content: 'Nulla ut erat id mauris vulputate elementum.?',
    projectId: 4
  },
  {
    content: 'Nulla justo.?',
    projectId: 15
  },
  {
    content: 'Curabitur at ipsum ac tellus semper interdum.?',
    projectId: 2
  },
  {
    content:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.?',
    projectId: 18
  },
  {
    content: 'Integer tincidunt ante vel ipsum.?',
    projectId: 3
  },
  {
    content:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla.?',
    projectId: 14
  },
  {
    content: 'Morbi ut odio.?',
    projectId: 17
  },
  {
    content: 'Pellentesque ultrices mattis odio.?',
    projectId: 6
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.?',
    projectId: 11
  },
  {
    content: 'Phasellus sit amet erat.?',
    projectId: 8
  },
  {
    content: 'Morbi quis tortor id nulla ultrices aliquet.?',
    projectId: 6
  },
  {
    content: 'Ut at dolor quis odio consequat varius.?',
    projectId: 7
  },
  {
    content: 'Nullam sit amet turpis elementum ligula vehicula consequat.?',
    projectId: 7
  },
  {
    content: 'Quisque ut erat.?',
    projectId: 6
  },
  {
    content:
      'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.?',
    projectId: 2
  },
  {
    content: 'Nullam molestie nibh in lectus.?',
    projectId: 13
  },
  {
    content: 'Mauris sit amet eros.?',
    projectId: 14
  },
  {
    content: 'Donec posuere metus vitae ipsum.?',
    projectId: 16
  },
  {
    content: 'Integer tincidunt ante vel ipsum.?',
    projectId: 4
  },
  {
    content: 'Curabitur convallis.?',
    projectId: 2
  },
  {
    content: 'Phasellus id sapien in sapien iaculis congue.?',
    projectId: 11
  },
  {
    content:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.?',
    projectId: 4
  },
  {
    content: 'Donec semper sapien a libero.?',
    projectId: 9
  },
  {
    content: 'Etiam faucibus cursus urna.?',
    projectId: 20
  }
]

const snippets = [
  {
    content: 'Pellentesque ultrices mattis odio.',
    questionId: 15
  },
  {
    content: 'Morbi porttitor lorem id ligula.',
    questionId: 33
  },
  {
    content:
      'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.',
    questionId: 48
  },
  {
    content: 'Nunc rhoncus dui vel sem.',
    questionId: 42
  },
  {
    content: 'Nulla tellus.',
    questionId: 30
  },
  {
    content: 'Morbi non quam nec dui luctus rutrum.',
    questionId: 35
  },
  {
    content:
      'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    questionId: 25
  },
  {
    content: 'Nulla nisl.',
    questionId: 33
  },
  {
    content: 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
    questionId: 30
  },
  {
    content: 'Nulla ut erat id mauris vulputate elementum.',
    questionId: 18
  },
  {
    content: 'Fusce posuere felis sed lacus.',
    questionId: 29
  },
  {
    content:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    questionId: 34
  },
  {
    content: 'Integer a nibh.',
    questionId: 24
  },
  {
    content: 'Nunc purus.',
    questionId: 46
  },
  {
    content:
      'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    questionId: 33
  },
  {
    content: 'Quisque ut erat.',
    questionId: 1
  },
  {
    content:
      'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.',
    questionId: 13
  },
  {
    content: 'Nulla nisl.',
    questionId: 29
  },
  {
    content: 'Donec ut mauris eget massa tempor convallis.',
    questionId: 22
  },
  {
    content:
      'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.',
    questionId: 36
  },
  {
    content: 'Morbi non lectus.',
    questionId: 32
  },
  {
    content: 'Nunc purus.',
    questionId: 5
  },
  {
    content: 'Cras non velit nec nisi vulputate nonummy.',
    questionId: 31
  },
  {
    content: 'Aliquam quis turpis eget elit sodales scelerisque.',
    questionId: 49
  },
  {
    content: 'Nam dui.',
    questionId: 18
  },
  {
    content: 'Praesent lectus.',
    questionId: 20
  },
  {
    content: 'Morbi a ipsum.',
    questionId: 30
  },
  {
    content:
      'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    questionId: 1
  },
  {
    content: 'Vivamus in felis eu sapien cursus vestibulum.',
    questionId: 46
  },
  {
    content: 'Nam nulla.',
    questionId: 48
  },
  {
    content: 'Pellentesque at nulla.',
    questionId: 28
  },
  {
    content: 'Duis consequat dui nec nisi volutpat eleifend.',
    questionId: 37
  },
  {
    content: 'Duis bibendum.',
    questionId: 9
  },
  {
    content:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    questionId: 12
  },
  {
    content: 'Cras in purus eu magna vulputate luctus.',
    questionId: 27
  },
  {
    content: 'Vivamus vel nulla eget eros elementum pellentesque.',
    questionId: 20
  },
  {
    content: 'Vestibulum rutrum rutrum neque.',
    questionId: 36
  },
  {
    content:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.',
    questionId: 46
  },
  {
    content:
      'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.',
    questionId: 47
  },
  {
    content: 'In hac habitasse platea dictumst.',
    questionId: 25
  },
  {
    content: 'Mauris sit amet eros.',
    questionId: 1
  },
  {
    content: 'Curabitur in libero ut massa volutpat convallis.',
    questionId: 3
  },
  {
    content:
      'Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.',
    questionId: 50
  },
  {
    content:
      'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    questionId: 6
  },
  {
    content: 'Pellentesque at nulla.',
    questionId: 46
  },
  {
    content: 'Curabitur in libero ut massa volutpat convallis.',
    questionId: 6
  },
  {
    content:
      'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.',
    questionId: 43
  },
  {
    content:
      'Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.',
    questionId: 32
  },
  {
    content:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.',
    questionId: 42
  },
  {
    content:
      'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.',
    questionId: 33
  },
  {
    content:
      'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    questionId: 22
  },
  {
    content: 'In quis justo.',
    questionId: 42
  },
  {
    content: 'Cras non velit nec nisi vulputate nonummy.',
    questionId: 40
  },
  {
    content: 'Mauris sit amet eros.',
    questionId: 14
  },
  {
    content: 'Duis bibendum.',
    questionId: 5
  },
  {
    content: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    questionId: 47
  },
  {
    content: 'In est risus, auctor sed, tristique in, tempus sit amet, sem.',
    questionId: 4
  },
  {
    content: 'Donec ut dolor.',
    questionId: 22
  },
  {
    content: 'Duis consequat dui nec nisi volutpat eleifend.',
    questionId: 10
  },
  {
    content: 'Nam nulla.',
    questionId: 6
  },
  {
    content: 'Aenean sit amet justo.',
    questionId: 15
  },
  {
    content: 'Aliquam sit amet diam in magna bibendum imperdiet.',
    questionId: 11
  },
  {
    content: 'Suspendisse accumsan tortor quis turpis.',
    questionId: 43
  },
  {
    content: 'Maecenas tincidunt lacus at velit.',
    questionId: 46
  },
  {
    content: 'Morbi non lectus.',
    questionId: 6
  },
  {
    content: 'Vivamus in felis eu sapien cursus vestibulum.',
    questionId: 33
  },
  {
    content: 'Nullam varius.',
    questionId: 2
  },
  {
    content: 'Donec quis orci eget orci vehicula condimentum.',
    questionId: 27
  },
  {
    content: 'Integer tincidunt ante vel ipsum.',
    questionId: 46
  },
  {
    content: 'Suspendisse potenti.',
    questionId: 19
  },
  {
    content: 'Vestibulum sed magna at nunc commodo placerat.',
    questionId: 43
  },
  {
    content: 'Integer ac leo.',
    questionId: 24
  },
  {
    content:
      'Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.',
    questionId: 35
  },
  {
    content: 'Quisque porta volutpat erat.',
    questionId: 25
  },
  {
    content: 'Integer a nibh.',
    questionId: 42
  },
  {
    content: 'Sed sagittis.',
    questionId: 33
  },
  {
    content: 'Etiam pretium iaculis justo.',
    questionId: 29
  },
  {
    content:
      'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    questionId: 36
  },
  {
    content: 'Mauris ullamcorper purus sit amet nulla.',
    questionId: 31
  },
  {
    content: 'Duis bibendum.',
    questionId: 21
  },
  {
    content: 'Integer a nibh.',
    questionId: 26
  },
  {
    content: 'Aenean lectus.',
    questionId: 18
  },
  {
    content: 'Curabitur convallis.',
    questionId: 39
  },
  {
    content: 'Donec dapibus.',
    questionId: 44
  },
  {
    content:
      'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
    questionId: 11
  },
  {
    content: 'Duis bibendum.',
    questionId: 26
  },
  {
    content: 'Praesent id massa id nisl venenatis lacinia.',
    questionId: 40
  },
  {
    content: 'Etiam vel augue.',
    questionId: 39
  },
  {
    content: 'Cras non velit nec nisi vulputate nonummy.',
    questionId: 26
  },
  {
    content: 'Morbi vel lectus in quam fringilla rhoncus.',
    questionId: 47
  },
  {
    content: 'Nulla mollis molestie lorem.',
    questionId: 9
  },
  {
    content: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    questionId: 46
  },
  {
    content: 'Cras in purus eu magna vulputate luctus.',
    questionId: 8
  },
  {
    content: 'Quisque ut erat.',
    questionId: 14
  },
  {
    content: 'Praesent id massa id nisl venenatis lacinia.',
    questionId: 24
  },
  {
    content: 'Aenean sit amet justo.',
    questionId: 12
  },
  {
    content:
      'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
    questionId: 4
  },
  {
    content:
      'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    questionId: 1
  },
  {
    content:
      'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
    questionId: 22
  },
  {
    content: 'Duis bibendum.',
    questionId: 4
  },
  {
    content: 'Donec vitae nisi.',
    questionId: 17
  },
  {
    content: 'Donec quis orci eget orci vehicula condimentum.',
    questionId: 16
  },
  {
    content:
      'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.',
    questionId: 34
  },
  {
    content: 'Vivamus vel nulla eget eros elementum pellentesque.',
    questionId: 34
  },
  {
    content: 'Integer a nibh.',
    questionId: 44
  },
  {
    content: 'Aenean lectus.',
    questionId: 25
  },
  {
    content: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla.',
    questionId: 1
  },
  {
    content: 'Duis consequat dui nec nisi volutpat eleifend.',
    questionId: 40
  },
  {
    content: 'Integer tincidunt ante vel ipsum.',
    questionId: 7
  },
  {
    content:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
    questionId: 18
  },
  {
    content: 'Pellentesque at nulla.',
    questionId: 8
  },
  {
    content: 'Sed accumsan felis.',
    questionId: 22
  },
  {
    content: 'Integer non velit.',
    questionId: 18
  },
  {
    content: 'Sed ante.',
    questionId: 13
  },
  {
    content:
      'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
    questionId: 36
  },
  {
    content:
      'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.',
    questionId: 17
  },
  {
    content:
      'Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
    questionId: 35
  },
  {
    content:
      'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    questionId: 21
  },
  {
    content: 'Morbi ut odio.',
    questionId: 5
  },
  {
    content: 'In quis justo.',
    questionId: 16
  },
  {
    content: 'Nulla mollis molestie lorem.',
    questionId: 13
  },
  {
    content: 'Duis aliquam convallis nunc.',
    questionId: 13
  },
  {
    content: 'Nunc purus.',
    questionId: 39
  },
  {
    content:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.',
    questionId: 25
  },
  {
    content: 'Praesent lectus.',
    questionId: 20
  },
  {
    content: 'Donec vitae nisi.',
    questionId: 25
  },
  {
    content: 'Phasellus id sapien in sapien iaculis congue.',
    questionId: 8
  },
  {
    content: 'Aenean sit amet justo.',
    questionId: 5
  },
  {
    content: 'Nulla tellus.',
    questionId: 14
  },
  {
    content: 'Donec ut dolor.',
    questionId: 39
  },
  {
    content: 'Suspendisse potenti.',
    questionId: 4
  },
  {
    content: 'Morbi porttitor lorem id ligula.',
    questionId: 31
  },
  {
    content: 'Pellentesque at nulla.',
    questionId: 50
  },
  {
    content: 'Mauris sit amet eros.',
    questionId: 16
  },
  {
    content:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.',
    questionId: 35
  },
  {
    content: 'In hac habitasse platea dictumst.',
    questionId: 25
  },
  {
    content: 'Integer ac neque.',
    questionId: 29
  },
  {
    content: 'Morbi vel lectus in quam fringilla rhoncus.',
    questionId: 38
  },
  {
    content: 'Nullam porttitor lacus at turpis.',
    questionId: 1
  },
  {
    content: 'Pellentesque ultrices mattis odio.',
    questionId: 1
  },
  {
    content: 'Nulla ut erat id mauris vulputate elementum.',
    questionId: 26
  },
  {
    content: 'Suspendisse potenti.',
    questionId: 32
  },
  {
    content:
      'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.',
    questionId: 16
  },
  {
    content:
      'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    questionId: 11
  },
  {
    content: 'Cras in purus eu magna vulputate luctus.',
    questionId: 41
  },
  {
    content:
      'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
    questionId: 23
  },
  {
    content: 'Nullam porttitor lacus at turpis.',
    questionId: 38
  },
  {
    content:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.',
    questionId: 38
  },
  {
    content: 'In hac habitasse platea dictumst.',
    questionId: 17
  },
  {
    content: 'Maecenas rhoncus aliquam lacus.',
    questionId: 2
  },
  {
    content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    questionId: 43
  },
  {
    content: 'Curabitur in libero ut massa volutpat convallis.',
    questionId: 21
  },
  {
    content: 'Etiam faucibus cursus urna.',
    questionId: 32
  },
  {
    content: 'Integer ac neque.',
    questionId: 16
  },
  {
    content: 'Nam dui.',
    questionId: 11
  },
  {
    content: 'Sed vel enim sit amet nunc viverra dapibus.',
    questionId: 4
  },
  {
    content: 'Curabitur convallis.',
    questionId: 35
  },
  {
    content: 'Suspendisse accumsan tortor quis turpis.',
    questionId: 49
  },
  {
    content: 'Sed accumsan felis.',
    questionId: 19
  },
  {
    content: 'Cras in purus eu magna vulputate luctus.',
    questionId: 40
  },
  {
    content:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.',
    questionId: 6
  },
  {
    content:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.',
    questionId: 48
  },
  {
    content: 'Pellentesque at nulla.',
    questionId: 40
  },
  {
    content: 'Praesent blandit.',
    questionId: 5
  },
  {
    content: 'Nulla nisl.',
    questionId: 50
  },
  {
    content: 'Sed accumsan felis.',
    questionId: 42
  },
  {
    content:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.',
    questionId: 21
  },
  {
    content: 'Cras in purus eu magna vulputate luctus.',
    questionId: 49
  },
  {
    content: 'Nam tristique tortor eu pede.',
    questionId: 35
  },
  {
    content: 'Nunc nisl.',
    questionId: 19
  },
  {
    content: 'Phasellus id sapien in sapien iaculis congue.',
    questionId: 5
  },
  {
    content:
      'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.',
    questionId: 3
  },
  {
    content: 'Praesent blandit lacinia erat.',
    questionId: 38
  },
  {
    content: 'Phasellus id sapien in sapien iaculis congue.',
    questionId: 12
  },
  {
    content: 'Proin at turpis a pede posuere nonummy.',
    questionId: 30
  },
  {
    content: 'Duis ac nibh.',
    questionId: 46
  },
  {
    content:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    questionId: 33
  },
  {
    content:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    questionId: 31
  },
  {
    content: 'Aenean auctor gravida sem.',
    questionId: 29
  },
  {
    content: 'Vestibulum rutrum rutrum neque.',
    questionId: 12
  },
  {
    content:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    questionId: 36
  },
  {
    content: 'Nullam sit amet turpis elementum ligula vehicula consequat.',
    questionId: 29
  },
  {
    content: 'Aliquam erat volutpat.',
    questionId: 20
  },
  {
    content:
      'Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.',
    questionId: 8
  },
  {
    content:
      'Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.',
    questionId: 41
  },
  {
    content: 'Praesent blandit lacinia erat.',
    questionId: 32
  },
  {
    content: 'Curabitur convallis.',
    questionId: 35
  },
  {
    content: 'Nulla tempus.',
    questionId: 50
  },
  {
    content: 'Duis at velit eu est congue elementum.',
    questionId: 11
  },
  {
    content: 'Morbi a ipsum.',
    questionId: 47
  },
  {
    content: 'In eleifend quam a odio.',
    questionId: 44
  },
  {
    content: 'Pellentesque at nulla.',
    questionId: 49
  },
  {
    content: 'In hac habitasse platea dictumst.',
    questionId: 17
  },
  {
    content: 'Aenean sit amet justo.',
    questionId: 21
  },
  {
    content:
      'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla.',
    questionId: 36
  },
  {
    content:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam.',
    questionId: 16
  },
  {
    content:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.',
    questionId: 1
  },
  {
    content:
      'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    questionId: 4
  },
  {
    content: 'Duis aliquam convallis nunc.',
    questionId: 15
  },
  {
    content: 'Morbi vel lectus in quam fringilla rhoncus.',
    questionId: 21
  }
]

const projects = [
  {
    name: 'Beisa oryx',
    userId: 9
  },
  {
    name: 'Snake-necked turtle',
    userId: 9
  },
  {
    name: 'Ostrich',
    userId: 6
  },
  {
    name: 'Falcon, prairie',
    userId: 5
  },
  {
    name: 'Lory, rainbow',
    userId: 7
  },
  {
    name: 'Vulture, oriental white-backed',
    userId: 3
  },
  {
    name: 'Weaver, sociable',
    userId: 6
  },
  {
    name: 'Native cat',
    userId: 3
  },
  {
    name: 'Marmot, hoary',
    userId: 4
  },
  {
    name: 'Cat, long-tailed spotted',
    userId: 2
  },
  {
    name: 'Asiatic wild ass',
    userId: 10
  },
  {
    name: 'Jungle cat',
    userId: 3
  },
  {
    name: 'Eurasian red squirrel',
    userId: 4
  },
  {
    name: 'Margay',
    userId: 8
  },
  {
    name: 'Common zorro',
    userId: 9
  },
  {
    name: 'Bulbul, black-fronted',
    userId: 1
  },
  {
    name: 'Coyote',
    userId: 1
  },
  {
    name: 'Penguin, fairy',
    userId: 2
  },
  {
    name: 'Red sheep',
    userId: 2
  },
  {
    name: 'Snake, western patch-nosed',
    userId: 5
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    projects.map(project => {
      return Project.create(project)
    })
  )

  await Promise.all(
    questions.map(question => {
      return Question.create(question)
    })
  )

  await Promise.all(
    snippets.map(snippet => {
      return Snippet.create(snippet)
    })
  )

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
