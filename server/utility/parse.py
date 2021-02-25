import json
import re
import itertools
import pprint
import json
from pathlib import Path
from pdfreader import SimplePDFViewer


"""
3. parse for terms for those years
4. parse for courses for those terms
"""


def initViewer():
    # get absolute path of transcript to open
    script_location = Path(__file__).absolute().parent
    file = script_location / "transcript.pdf"
    fd = open(file, "rb")

    # create viewer instance
    viewer = SimplePDFViewer(fd)
    return viewer


def pairwise(iterable):
    # s -> (s0,s1), (s1,s2), (s2, s3), ...
    a, b = itertools.tee(iterable)
    next(b, None)
    return zip(a, b)


def joinList(myList):
    myJoinedList = []

    # rejoin previously split term year list
    separator = " "
    for item in myList:
        myJoinedList.append(separator.join(item))

    return myJoinedList


# get list of terms for all years enrolled (i.e Fall 2015)
def getTermsWithYear(viewer):
    viewer.navigate(1)
    termsWithYear = []

    # loop through each page
    for canvas in viewer:
        # loop through each word of the page
        for term in canvas.strings:
            # append to term list if word matches
            if re.search(r"Fall \d{4}", term):
                termsWithYear.append(term.split(" "))
            elif re.search(r"Spring \d{4}", term):
                termsWithYear.append(term.split(" "))
            elif re.search(r"Summer \d{4}", term):
                termsWithYear.append(term.split(" "))
            elif re.search(r"Winter \d{4}", term):
                termsWithYear.append(term.split(" "))

    return termsWithYear


def getCourses(viewer, termsWithYear):
    viewer.navigate(1)
    termsWithYear = joinList(termsWithYear)

    for pair in list(pairwise(termsWithYear)):
        print(f"show data between {pair[0]} and {pair[1]}")


def getParsedData(viewer):
    data = []
    years = []
    terms = []
    body = {}

    termsWithYear = getTermsWithYear(viewer)
    getCourses(viewer, termsWithYear)

    for term in termsWithYear:
        # split the years
        years.append(term[1])
        # split the terms
        terms.append(term[0])

        # hashmap
        key = term[1]  # make the current year in loop the key for map
        body.setdefault(key, [])
        body[key].append(  # append the term to the corresponding year
            {term[0]: ["data"]}
        )

    data.append(body)

    return data


if __name__ == "__main__":
    contents = getParsedData(initViewer())
    # print(json.dumps(contents, indent=1))


"""
current state:
[
    {
        '2015': 
            {
                FALL: [data],
            },
            {
                SPRING: [data],
            }
    },
    {
        '2016': 
            {
                FALL: [data],
            },
            {
                SPRING: [data],
            }
    },
    {
        '2017': 
            {
                FALL: [data],
            },
            {
                SPRING: [data],
            }
    },
    {
        '2018': 
            {
                FALL: [data],
            },
            {
                SPRING: [data],
            }
    }
]
"""