import os
import glob
import shutil
import zipfile

input_dir = 'C:/Users/Butter/Documents/GitHub/GeoData/Raw'
output_dir = 'C:/Users/Butter/Documents/GitHub/GeoData/Processed'

os.makedirs(output_dir, exist_ok=True)

adm_zip_files = os.listdir(input_dir)
for adm_zip in adm_zip_files:
    ISO = adm_zip.split('_')[0]
    with zipfile.ZipFile(os.path.join(input_dir, adm_zip), 'r') as zip_ref:
        zip_ref.extractall(os.path.join(output_dir, f"unzipped_adm_files/{ISO}"))

shape_files = glob.glob(os.path.join(output_dir, 'unzipped_adm_files', '*', '*.*'))

for shape_file in shape_files:
    folder = 'shape_files'
    os.makedirs(os.path.join(output_dir, folder), exist_ok=True)
    shutil.copy(shape_file, os.path.join(output_dir, folder))

# delete unzipped files
shutil.rmtree(os.path.join(output_dir, 'unzipped_adm_files'))

