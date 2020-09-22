/* subscribeToMore({
  document: ROLLCHANGE,
  updateQuery: (prev, { subscriptionData }) => {
    if (!subscriptionData.data) return prev;
    const newRollNumber = subscriptionData.data.rollNumber;
    return {
      ...prev,
      hall: { ...prev.hall, rollNumber: newRollNumber },
    };
  },
});
const GETHALLS = gql`
  query {
    halls(CourtId: 1) {
      id
      rollNumber
    }
  }
`;
const SubscribeHall = gql`
  subscription hall($hallId: ID!) {
    rollNumber(hallId: $hallId)
  }
`;

  const listenForHall = useCallback(
      (hallId: number) => {
        subscribeToMore({
          document: SubscribeHall,
          variables: { hallId },
          updateQuery: (prev, { subscriptionData }) => {
            const newRollNumber = subscriptionData.data.rollNumber;
            const newHalls = prev.halls.map((hall: any) => {
              if (hall.id === hallId)
                return { ...hall, rollNumber: newRollNumber };
              return hall;
            });
            return {
              ...prev,
              halls: newHalls,
            };
          },
        });
      },
      [subscribeToMore]
    );
    useEffect(() => {
      if (data) {
        data.halls.forEach((hall: any) => listenForHall(hall.id));
      }
    }, [data, listenForHall]);

const GETHALLDATE = gql`
  query {
    hall(id: 2) {
      id
      rollNumber
      official
      sunday
    }
  }
`;
const ROLLCHANGE = gql`
  subscription {
    rollNumber(hallId: 2)
  }
`;
 */
