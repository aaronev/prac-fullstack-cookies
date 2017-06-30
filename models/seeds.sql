INSERT INTO
  albums (title, artist)
VALUES
  ('Malibu', 'Anderson .Paak'),
  ('A Seat at the Table', 'Solange Knowles'),
  ('Melodrama', 'Lorde'),
  ('In Rainbows', 'Radiohead')
;

INSERT INTO
  users (name, email, password, image)
VALUES
  ('Aaron', 'aaron@aaron.com', 'aaron', 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Restless_flycatcher04.jpg'),
  ('Anonymous', 'anonmymous@anonymous.org', 'anonymous', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Anonymous_emblem.svg/1200px-Anonymous_emblem.svg.png'),
  ('John Doe', 'johndoe@johndoe.com', 'johndoe', 'http://u.o0bc.com/avatars/no-user-image.gif')
;


INSERT INTO
  reviews (user_id, album_id, review)
VALUES
  (1, 1, 'This album was great!!!! I could resonate!' ),
  (2, 1, 'Overall, not that bad, could get better.' ),
  (3, 1, 'This album lacked a few things such as theme.' ),
  (1, 2, 'I like the story and lyrics to this album.' ),
  (2, 2, 'Until now, I have no idea why I never listened to it.' ),
  (3, 2, 'Good, MUSIC!' ),
  (1, 3, 'This was okay, for me personally, it needed more intensity.' ),
  (2, 3, 'What, wow, why? More importantly how!' ),
  (3, 3, 'Yeah, it could have been better.' )
;