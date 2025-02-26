# E-Waste Recycling Centers in UAE
recycling_centers = [
    {
        "name": "EnviroServe",
        "location": "Dubai Industrial City, Saih Shuaib 3, Site No. 30014, Dubai, UAE",
        "contact": "+971 4 885 2434",
        "website": "https://enviroserve.org/"
    },
    {
        "name": "Green Solutions",
        "location": "Warehouse: LIU10 BC 05, Jebel Ali, Dubai, UAE",
        "contact": "+971 4 354 4223",
        "website": "https://www.greensolutionsuae.com/"
    },
    {
        "name": "E-Scrappy Recyclers",
        "location": "Dubai, UAE",
        "contact": "+971 4 221 1141",
        "website": "https://www.escrappy.ae/"
    },
    {
        "name": "WAT (Electronic Asset Disposition Services)",
        "location": "Dubai, UAE",
        "contact": "+971 52 201 2378",
        "website": "https://wat.ae/"
    },
    {
        "name": "RECAPP",
        "location": "Abu Dhabi, UAE",
        "contact": "info@gorecapp.com",
        "website": "https://www.gorecapp.com/"
    },
    {
        "name": "Dubai Recycling Centres",
        "location": "Various locations including Deira, Bur Dubai, and Downtown Dubai",
        "contact": "Contact local municipality for details",
        "website": "https://www.bayut.com/mybayut/how-recycle-electronic-waste-dubai/"
    }
]

# Function to display recycling centers
def display_centers():
    print("\n--- UAE E-Waste Recycling Centers ---")
    for i, center in enumerate(recycling_centers, 1):
        print(f"{i}. {center['name']}")

# Function to get details of a selected center
def get_center_details(choice):
    if 1 <= choice <= len(recycling_centers):
        center = recycling_centers[choice - 1]
        print("\n--- Recycling Center Details ---")
        print(f"Name: {center['name']}")
        print(f"Location: {center['location']}")
        print(f"Contact: {center['contact']}")
        print(f"Website: {center['website']}\n")
    else:
        print("\nInvalid selection. Please try again.")

# Main function
def main():
    while True:
        display_centers()
        try:
            choice = int(input("\nEnter the number of the recycling center you want details for (0 to exit): "))
            if choice == 0:
                print("Exiting program. Have a great day!")
                break
            get_center_details(choice)
        except ValueError:
            print("\nInvalid input. Please enter a number.")

# Run the script
if __name__ == "__main__":
    main()
