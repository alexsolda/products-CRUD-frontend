import { Flex, Text, Box } from "@chakra-ui/layout";

interface HeaderProps {
  title: string;
}

export const Header = ({title}: HeaderProps) => {
  return (
    <Box as="header" h="100px" bg="gray.600" pl="10px" pr="10px" mb='40px'>
      <Flex alignItems="center" maxW="1440px" m="0 auto" h="full" w="100%">
        <Text fontSize="2xl" color="gray.50">
          {title}
        </Text>
      </Flex>
    </Box>
  );
}
