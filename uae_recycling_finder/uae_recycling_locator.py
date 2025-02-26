# E-Waste Recycling Centers in the UAE
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
    },
    {
        "name": "Al Qaisar Recycling",
        "location": "Ajman, UAE",
        "contact": "+971 50 5462353",
        "website": "https://alqaisarrecycling.com/"
    },
    {
        "name": "Ecyclex International Recycling",
        "location": "Al Qusais Industrial Area 4, Dubai, UAE",
        "contact": "800-3292539",
        "website": "https://www.dubizzle.com/blog/property/e-waste-recycling-dubai/"
    },
    {
        "name": "Public Services Department - E-Waste Pick-up",
        "location": "Al Qusaidat, Ras Al-Khaimah, UAE",
        "contact": "+971-72270035",
        "website": "https://stg.rak.ae/wps/portal/rak/e-services/govt/rak-pswd/waste-management-agency/wma-e-waste-pick-up"
    },
    {
        "name": "Gulf IT Scrap",
        "location": "Ajman, UAE",
        "contact": "info@gulfitscrap.com",
        "website": "https://www.gulfitscrap.com/Location/ajman"
    },
    {
        "name": "Virogreen Middle East",
        "location": "Dubai, UAE",
        "contact": "+971 55 5061485",
        "website": "https://www.facebook.com/virogreenuae/"
    },
    {
        "name": "Mr. Cheaply Junk Removal Services",
        "location": "Serving all seven emirates",
        "contact": "info@mrcheaply.com",
        "website": "https://mrcheaply.com/"
    }
]

# Function to display recycling centers
def display_centers():
    print("\n--- UAE E-Waste Recycling Centers ---")
    for i, center in enumerate(recycling_centers, 1):
        print(f"{i}. {center['name']} - {center['location']}")

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
