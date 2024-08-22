import requests
import json
import random

langs = ["js", "py", "cpp", "c", "java"]

for i in range(100):

    record_exe = requests.post(
        url = "http://localhost:8080/vault/record_visitation",
        json = {
            "last_login": str(random.randint(2023, 2024))+ "-" + str(random.randint(1, 12)) + "-" + str(random.randint(1, 30)),
            "last_visit": str(random.randint(2023, 2024))+ "-" + str(random.randint(1, 12)) + "-" + str(random.randint(1, 30)),
            "user_id": str(random.randint(35, 137))
        }
    )

    print(record_exe.text)
