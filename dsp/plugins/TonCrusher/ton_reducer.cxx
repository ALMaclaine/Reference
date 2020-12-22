/** \file
*  Total Square Destruction
*/

string name = "Test";
string description = "TesterScript";

array<string> inputParametersNames = {"Bit Reduction"};
array<double> inputParameters(inputParametersNames.length);
array<double> inputParametersMin = {0};
array<double> inputParametersMax = {32};
array<double> inputParametersDefault = {0};

uint crush;
double rem;
double curSamp;

double left;
double right;

void processSample(array<double> &ioSample)
{
    if ((curSamp % 200) == 0) {
      left = ioSample[0];
      right = ioSample[1];
    }
    ioSample[0] = left;
    ioSample[1] = right;
    curSamp++;

    // if ((curSamp > 0 && curSamp % 3.97 > 2.6)
    // || (curSamp < 0 && curSamp % 3.97 < 2.6)) {
    //   left = ioSample[0];
    //   right = ioSample[1];
    // }
    // ioSample[0] = left;
    // ioSample[1] = right;
    // curSamp++;
}
