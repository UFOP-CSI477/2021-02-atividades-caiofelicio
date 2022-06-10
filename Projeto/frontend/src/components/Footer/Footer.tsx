export default function Footer() {
  return (
    <footer className="w-full p-4 bg-white h-[16vh] shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022 Caio Felício <span />.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a
            href="https://github.com/caiofelicio"
            className="mr-4 hover:underline md:mr-6 "
          >
            Github
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/caio-felicio"
            className="mr-4 hover:underline md:mr-6"
          >
            Linkedin
          </a>
        </li>
        <li>
          <a
            href="mailto:caio.felicio@aluno.ufop.edu.br"
            className="hover:underline"
          >
            Contato
          </a>
        </li>
      </ul>
    </footer>
  );
}
