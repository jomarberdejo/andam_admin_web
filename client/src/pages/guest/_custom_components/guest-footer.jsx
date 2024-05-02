const GuestFooter = () => {
  return (
    <footer className="py-14 ">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="block mx-0 md:mx-auto">
          <h3 className="text-lg font-semibold">REPUBLIC OF THE PHILIPPINES</h3>
          <p className="mt-2 text-md text-muted-foreground">
            Explore information about the Philippine government, its structure,
            functioning, and the dedicated individuals working for the nation's
            progress.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Copyright: The image used in this website is not ours and is for
            education purposes only.
          </p>
        </div>

        <div className="block mx-0 md:mx-auto">
          <h3 className="text-lg font-semibold">EMERGENCY CONTACTS</h3>
          <p className="mt-2 text-sm">
            PNP:{" "}
            <a
              href="tel:09985986424"
              className="text-blue-500 underline  underline-offset-2"
            >
              0998 598 6424
            </a>
          </p>
          <p className="mt-1 text-sm">
            BFP:{" "}
            <a
              href="tel:09483863697"
              className="text-blue-500 underline underline-offset-2"
            >
              0948 386 3697
            </a>
          </p>
          <p className="mt-1 text-sm">
            MDRRMO:{" "}
            <a
              href="tel:09483863697"
              className="text-blue-500 underline underline-offset-2"
            >
              0948 386 3697
            </a>
          </p>
          <p className="mt-1 text-sm">
            LGU:{" "}
            <a
              href="tel:09497955530"
              className="text-blue-500 underline underline-offset-2"
            >
              0949 795 5530
            </a>
          </p>
        </div>
        <div className="block mx-0 md:mx-auto">
          <h3 className="text-lg font-semibold">CONTACT US</h3>
          <p className="mt-2 text-sm">
            Email:{" "}
            <a
              href="mailto:berdejojomar@gmail.com"
              className="text-blue-500 underline  underline-offset-2"
            >
              mdrrmocarigara@gmail.com
            </a>
          </p>
          <p className="mt-1 text-sm">
            Office of Mayor:{" "}
            <a
              href="tel:+63385318001"
              className="text-blue-500 underline  underline-offset-2"
            >
              (038) 531-8001/2382
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GuestFooter;
