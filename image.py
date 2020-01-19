from keras.applications import Xception
from keras.preprocessing import image
from keras.applications import imagenet_utils
from keras.applications.inception_v3 import preprocess_input
import numpy as np

model =Xception(weights='imagenet')

def get_sentence(path):
    img_path = path
    img = image.load_img(img_path, target_size=(299, 299))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    preds = model.predict(x)
    value = P = imagenet_utils.decode_predictions(preds, top=3)[0][1]
    val = flatten_predictions(path)
   
    for v in range(len(value)):
        if v == 1:
            val_2 = value[v]
            break

    return [val,val_2]















    